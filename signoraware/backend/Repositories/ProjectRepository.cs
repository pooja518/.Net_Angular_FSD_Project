using Proj.Models;

namespace Proj.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        ProjectDbContext _context;
        public ProjectRepository(ProjectDbContext context)
        {
            _context = context;
        }
        public List<Product> GetAllProducts()
        {
            List<Product> products = _context.Products.ToList();
            return products;
        }
        public Product GetProductById(int id)
        {
            Product product = _context.Products.Find(id);
            return product;
        }
        public void CreateProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
        }
        public void UpdateProduct(Product product)
        {
            _context.Products.Update(product);
            _context.SaveChanges();
        }
        public Product DeleteProductById(int id)
        {
            Product obj = _context.Products.Find(id);
            if (obj != null)
            {
                _context.Products.Remove(obj);
                _context.SaveChanges();
            }
            return obj;
        }
        public List<Cart> GetCartByUserId(int userId)
        {

            List<Cart> CartObj = _context.Carts.Where(c => c.CartId == userId).ToList();
            return CartObj;
        }

        public bool AddToCart(int productId, int userId, int quantity)
        {
            // Check if the product exists
            var product = _context.Products.Find(productId);
            if (product == null)
            {
                // Product does not exist
                return false;
            }

            // Check if the user exists
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                // User does not exist
                return false;
            }

            // Create a new cart item
            var cartItem = new Cart
            {
                ProductId = productId,
                CartId = user.CartId,
                Quantity = quantity// Assuming CartId is unique to the user
            };

            // Add the cart item to the Carts table
            _context.Carts.Add(cartItem);
            _context.SaveChanges();

            return true;
        }

        public bool RemoveFromCart(int productId, int userId, int cartId)
        {
            // Check if the product exists
            var product = _context.Products.Find(productId);
            if (product == null)
            {
                // Product does not exist
                return false;
            }

            // Check if the user exists
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                // User does not exist
                return false;
            }

            // Create a new cart item
            Cart cartItem = _context.Carts.Where(p => p.ProductId == productId & p.CartId == cartId).ToList()[0];

            if(cartItem != null)
            {
                _context.Carts.Remove(cartItem);
                _context.SaveChanges();
                return true;
            }

            return false;
        }


        public List<string> GetAllCategoryNames()
        {
           List<String> categories =  _context.Products.Select(c => c.Category).Distinct().ToList();
            return categories;
        }

        public List<Product> GetProductsByCategory(String category)
        {
            List<Product> products = _context.Products.Where(c=> c.Category == category).ToList();
            return products;
        }



    }
}
