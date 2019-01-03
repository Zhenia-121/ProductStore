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
            CreateMap<ShoppingCart, ShoppingCartDto>();
            CreateMap<ShoppingCartProduct, CartItemDto>()
                .ForMember(pd => pd.Id, opts => opts.MapFrom(scp => scp.ProductId))
                .ForMember(pd => pd.Price, opts => opts.MapFrom(scp => scp.Product.Price))
                .ForMember(pd => pd.Title, opts => opts.MapFrom(scp => scp.Product.Title))
                .ForMember(pd => pd.Url, opts => opts.MapFrom(scp => scp.Product.Url));

            // From Dto/Api-Resources to domain model
            CreateMap<SaveProductDto, Product>();
            CreateMap<ProductQueryDto, ProductQuery>();
        }
    }
}
