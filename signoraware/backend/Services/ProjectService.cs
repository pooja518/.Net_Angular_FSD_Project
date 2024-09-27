using Proj.Models;
using Proj.Repositories;
using Proj.Services;
namespace Proj.Services
{
    public class ProjectService : IProjectService
    {
        public IProjectRepository _context;
        public ProjectService(IProjectRepository context)
        {
            _context = context;
        }
        public List<Product> GetAllProducts()
        {
            return _context.GetAllProducts();
        }
        public Product GetProductById(int id)
        {
            return _context.GetProductById(id);
        }
        public void CreateProduct(Product product)
        {
            _context.CreateProduct(product);
        }
        public void UpdateProduct(Product product)
        {
            _context.UpdateProduct(product);
        }
        public Product DeleteProductById(int id)
        {
            return _context.DeleteProductById(id);
        }
        public List<Cart> GetCartByUserId(int userId)
        {
            return _context.GetCartByUserId(userId);
        }
        public bool AddToCart(int ProductId, int UserId, int Quantity)
        {
            return _context.AddToCart(ProductId, UserId, Quantity);
        }
        public bool RemoveFromCart(int productId, int userId, int cartId)
        {
            return _context.RemoveFromCart(productId, userId, cartId);
        }
        public List<string> GetAllCategoryNames()
        {
            return _context.GetAllCategoryNames();
        }

        public List<Product> GetProductsByCategory(String category)
        {
            return _context.GetProductsByCategory(category);
        }
    }
}
