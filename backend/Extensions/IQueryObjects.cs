namespace backend.Extensions
{
    public interface IQueryObjects
    {
        string SortBy { get; set; }
        bool IsSortAscending { get; set; }
    }
}