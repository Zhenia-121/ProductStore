using AutoMapper;
using ProductsStore.Controllers.Dto;
using ProductsStore.Data.Models;

namespace ProductsStore.Infrastructure.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // From domain model to Dto/Api-Resources
            CreateMap<Product, ProductDto>();
            CreateMap<Category, CategoryDto>();


            // From Dto/Api-Resources to domain model
            CreateMap<SaveProductDto, Product>();
            CreateMap<ProductQueryDto, ProductQuery>();
        }
    }
}
