using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using System.Threading.Tasks;
using DatingApp.API.Dtos;
using System.Security.Claims;
using CloudinaryDotNet.Actions;
using DatingApp.API.Models;
using System.Linq;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        public IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public readonly IMapper _mapper;

        public PhotosController(IDatingRepository repo, IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            this._mapper = mapper;
            this._cloudinaryConfig = cloudinaryConfig;
            this._repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }


        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }


        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, PhotoForCreationDto photoForCreationDto)
        {
            // Authorise the user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),

                        // If the file is ridiculously big, then transform it... 
                        // we want it to fit in a square.
                        Transformation = new Transformation()
                            .Height(500)
                            .Width(500)
                            .Crop("fill")
                            .Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);


                }
            }

            photoForCreationDto.Url = uploadResult.Url.ToString();

            photoForCreationDto.PublicId = uploadResult.PublicId;

            // Map the DTO into the Photo class:
            var photo = _mapper.Map<Photo>(photoForCreationDto);

            // If it's the first photo, then by default it is the main photo:
            if (!userFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true; // Make it the default photo

            userFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {

                // You must have the Id of the photo in order to return it, so the 
                // automapping must be done after the SaveAll().
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);

                // Use the overload with the 
                return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            // Authorise the user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("You cannot delete your main photo");

            // Ensure it actually has a public id:
            if (photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                // Delete in Cloudinary and from the database.
                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                {
                    _repo.Delete(photoFromRepo);
                }

            }
            else 
            {
                // Just go ahead and delete it 
                _repo.Delete(photoFromRepo);
            }


            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the photo");
        }


        // not technically perfectly restful, but simpler
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            // Example: http://localhost:5000/api/users/1/photos/12/setmain
            // And then in the Body: to test in Postman, chose Raw, and then send up empty object {}

            // Authorise the user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // check that the Id matches one of the ids in the users repos.
            var user = await _repo.GetUser(userId);

            if (!user.Photos.Any(p => p.Id == id)) // if the id does not match any of the ids in the user's collection...
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("This is already the main photo");

            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);
            currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Could not set the photo to Main");
        }

    }
}