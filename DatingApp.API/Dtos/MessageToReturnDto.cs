using System;

namespace DatingApp.API.Dtos
{
    public class MessageToReturnDto
    {
        public int Id { get; set; }


        public int SenderId { get; set; }

        // Note: If the SenderId is recognosed as a UserId, AutoMapper is clever 
        // enough to strip out the words "Sender", and "Recipient" before
        //  "KnownAs". PhotoUrl needs a bit of separate functionality, which is done in the AutoMapper profile using ForMember()
        public string SenderKnownAs { get; set; }
        public string SenderPhotoUrl { get; set; }
        public int RecipientId { get; set; }
        public string RecipientKnownAs { get; set; }
        public string RecipientPhotoUrl { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? MessageReceived { get; set; }
        public DateTime MessageSent { get; set; }

    }
}