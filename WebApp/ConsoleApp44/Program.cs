using ConsoleApp44;
using ConsoleApp44.Models;

var appDbContext = new AppDbContext();

var appBuilder = WebApplication.CreateBuilder();

appBuilder.Services.AddCors(options => {
    options.AddDefaultPolicy(builder => {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = appBuilder.Build();

app.UseCors();

app.MapGet("/", () => {
    return "Hello, World!";
});

app.MapGet("/products", () => {
    return appDbContext.Products.ToList();
});

app.MapGet("/products/{id}", (int id) => {
    var data = appDbContext.Products.Find(id);

    if (data == null) return Results.NotFound("product not found!");

    return Results.Ok(data);
});

app.MapPost("/products", (Product product) => {
    appDbContext.Add(product);
    appDbContext.SaveChanges();

    return Results.Ok();
});


app.Run("http://localhost:5000");
