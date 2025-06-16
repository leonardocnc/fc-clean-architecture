import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../domain/product/entity/product";

describe("Product repository integration test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({
            where: { id: "123" },
        });

        expect(productModel.toJSON()).toStrictEqual({
            id: "123",
            name: "Product 1",
            price: 100,
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);

        await productRepository.create(product);

        product.changeName("Product 2");
        product.changePrice(200);

        await productRepository.update(product);

        const productModel = await ProductModel.findOne({
            where: { id: "123" },
        });

        expect(productModel.toJSON()).toStrictEqual({
            id: "123",
            name: "Product 2",
            price: 200,
        });
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);

        await productRepository.create(product);

        const productResult = await productRepository.find("123");

        expect(product).toStrictEqual(productResult);
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("123", "Product 1", 100);
        const product2 = new Product("456", "Product 2", 200);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const products = await productRepository.findAll();

        expect(products).toHaveLength(2);
        expect(products).toContainEqual(product1);
        expect(products).toContainEqual(product2);
    });

    it("should create multiple products with different prices", async () => {
        const productRepository = new ProductRepository();
        const products = [
            new Product("1", "Product A", 50.99),
            new Product("2", "Product B", 25.00),
            new Product("3", "Product C", 199.99),
        ];

        for (const product of products) {
            await productRepository.create(product);
        }

        const allProducts = await productRepository.findAll();

        expect(allProducts).toHaveLength(3);
        expect(allProducts.map(p => p.price)).toEqual([50.99, 25.00, 199.99]);
    });

    it("should handle product name changes correctly", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Original Name", 100);

        await productRepository.create(product);

        // Change name multiple times
        product.changeName("Updated Name");
        await productRepository.update(product);

        product.changeName("Final Name");
        await productRepository.update(product);

        const foundProduct = await productRepository.find("123");
        expect(foundProduct.name).toBe("Final Name");
    });

    it("should handle price changes correctly", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Test Product", 50);

        await productRepository.create(product);

        // Update price
        product.changePrice(75.50);
        await productRepository.update(product);

        const foundProduct = await productRepository.find("123");
        expect(foundProduct.price).toBe(75.50);
    });

    it("should maintain data integrity across operations", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Test Product", 100);

        // Create
        await productRepository.create(product);
        let foundProduct = await productRepository.find("123");
        expect(foundProduct.id).toBe("123");
        expect(foundProduct.name).toBe("Test Product");
        expect(foundProduct.price).toBe(100);

        // Update
        product.changeName("Updated Product");
        product.changePrice(150);
        await productRepository.update(product);

        foundProduct = await productRepository.find("123");
        expect(foundProduct.id).toBe("123");
        expect(foundProduct.name).toBe("Updated Product");
        expect(foundProduct.price).toBe(150);

        // Verify in findAll
        const allProducts = await productRepository.findAll();
        expect(allProducts).toHaveLength(1);
        expect(allProducts[0]).toEqual(foundProduct);
    });
});