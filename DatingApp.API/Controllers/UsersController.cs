using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // notice the inheritance about: ControllerBase gives us all the http stuff we need, without
        //  the Mvc View functionality (in Controller) which we do Not need (because I'll put that in Angular)
        private readonly IDatingRepository _repo;

        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }


        // GET api/users        
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            // IActionResult allows a http result instead of the default IEnumerable<string/int etc>
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            
            // http 200
            return Ok(usersToReturn);
        }


        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {            
            var user = await _repo.GetUser(id);

            // Automapper in action...
            var userToReturn = _mapper.Map<UserForDetailDto>(user);

            return Ok(userToReturn);
        }

    }
}