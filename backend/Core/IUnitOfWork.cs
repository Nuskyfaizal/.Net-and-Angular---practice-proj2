namespace backend.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}