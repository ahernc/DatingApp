namespace DatingApp.API.Models
{
    // The table will only store the Ids of the user liking, and the persion being liked.
    public class Like
    {
        public int LikerId { get; set; }
        public int LikeeId { get; set; }
        public User Liker { get; set; }
        public User Likee { get; set; }
    }
}