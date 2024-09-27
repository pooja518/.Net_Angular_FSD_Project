using Proj.Models;

namespace Proj.Repositories
{
    public interface IProjectRepository
    {
        List<Product> GetAllProducts();
        Product GetProductById(int id);
        void CreateProduct(Product product);
        void UpdateProduct(Product product);
        Product DeleteProductById(int id);
        List<Cart> GetCartByUserId(int userId);
        bool AddToCart(int ProductId, int UserId, int Quantity);
        bool RemoveFromCart(int productId, int userId, int cartId);
        List<string> GetAllCategoryNames();
        public List<Product> GetProductsByCategory(String category);
    }
}
