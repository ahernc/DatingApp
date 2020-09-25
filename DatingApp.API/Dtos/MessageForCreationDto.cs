using System;

namespace DatingApp.API.Dtos
{
    public class MessageForCreationDto
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public DateTime MessageSent { get; set; }
        public string Content { get; set; }
        public MessageForCreationDto()
        {
            MessageSent = DateTime.Now;
        }
        
        // For the purpose of instantly showing the Picture and Name of the user who sent the message in the Message Thread:
        public string SenderKnownAs { get; set; }
        public string SenderPhotoUrl { get; set; }
    }
}