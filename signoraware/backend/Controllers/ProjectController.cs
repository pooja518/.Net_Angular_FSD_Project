using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proj.Models;
using Proj.Services;
using Proj.Repositories;
using Microsoft.AspNetCore.Http;

namespace Proj.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        IProjectService _context;

        public ProjectController(IProjectService projectService)
        {
            _context = projectService;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            List<Product> products = _context.GetAllProducts();
            return Ok(products);
        }
        
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            Product obj = _context.GetProductById(id);
            if (obj != null)
            {
                return Ok(obj);
            }
            else
            {
                return NotFound(new { status = "Requested product details does not exist" });
            }
        }
        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {

            _context.CreateProduct(product);
            return Ok(new { status = "New product details added in server" });

        }

        [HttpPut]
        public IActionResult UpdateProduct(Product product)
        {
            _context.UpdateProduct(product);
            return Ok(new { status = "Product details updated in server" });
        }

        [HttpDelete("(id")]
        public IActionResult DeleteProductById(int id)
        {
            Product obj = _context.DeleteProductById(id);
            //return Ok(new { status = "product details are deleted from server" });

            if (obj != null)
            {
                return Ok(new { status = "product details are deleted from server" });
            }
            else
            {
                return NotFound(new { status = "Requested product details does not exist" });
            }

        }

        [HttpGet("cart{userId}")]

        public IActionResult GetCartByUserId(int userId) 
        {
            List<Cart> obj = _context.GetCartByUserId(userId);
            if (obj != null)
            {
                return Ok(obj);
            }
            else
            {
                return NotFound(new { status = "Requested Cart details does not exist" });
            }
        }


        [HttpGet("addproduct")]
        public IActionResult AddToCart([FromQuery]int ProductId, [FromQuery]int userId, [FromQuery] int Quantity)
        {
            bool val = _context.AddToCart(ProductId, userId, Quantity);
            if (val)
            {
                return Ok(new { status = "Product Added to Cart Succesfully" });
            }
            return Ok(new { status = "Product or User doesn't exist" });
        }

        [HttpGet("removeproduct")]
        public IActionResult RemoveFromCart([FromQuery] int ProductId, [FromQuery] int userId, [FromQuery] int cartId)
        {
            bool val = _context.RemoveFromCart(ProductId, userId, cartId);
            if (val)
            {
                return Ok(new { status = "Product removed from Cart Succesfully" });
            }
            return Ok(new { status = "Product or user doesn't exist" });
        }

        [HttpGet("categories")]

        public IActionResult GetAllCategories()
        {
            List<string> categories = _context.GetAllCategoryNames();
            if (categories != null)
            {
                return Ok(categories);
            }
            else
            {
                return Ok(new { status = "No Categories found" });
            }
        }

        [HttpGet("categories{category}")]

        public IActionResult GetProductsByCategory(String category)
        {
            List<Product> obj = _context.GetProductsByCategory(category);   
            if(obj != null)
            {
                return Ok(obj);
            }
            else
            {
                return Ok(new { status = "No products based on category" });
            }
        }
    }
}

//addtocart(productid,userid)
//removefromcart(productid,userid)
