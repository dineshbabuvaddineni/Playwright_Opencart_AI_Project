export class Helper {
  static convertPriceToNumber(price: string): number {
    const numericValue = price.replace(/[^0-9.]/g, "");
    return Number(numericValue);
  }

  static getProductDetails() {
    return {
      productName: "MacBook",
      productQuantity: "1",
      totalPrice: "$602.00",
    };
  }

  static getLoginDetails(): { email: string; password: string } {
    const appUrl = process.env.WEB_APP_URL || "";

    if (appUrl.includes("awesomeqa.com")) {
      return { email: "opencart.tester@example.com", password: "Test@1234" };
    }

    if (appUrl.includes("tutorialsninja.com")) {
      return { email: "pavanol@xyz.com", password: "test@123" };
    }

    const email = process.env.APP_EMAIL;
    const password = process.env.APP_PASSWORD;
    const hasConfiguredCredentials =
      email !== undefined &&
      password !== undefined &&
      email !== "YOUR_APP_EMAIL" &&
      password !== "YOUR_APP_PASSWORD";

    if (hasConfiguredCredentials) {
      return { email, password };
    }

    return { email: "test.customer@example.com", password: "Test@1234" };
  }
}
