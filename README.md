# Swag Labs (SauceDemo) E2E Test Automation Suite

![WebdriverIO](https://img.shields.io/badge/WebdriverIO-v9-orange?logo=webdriverio)
![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=nodedotjs)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow?logo=javascript)
![E2E tests](https://github.com/UlianaStah/webdriverio-saucedemo-automation/actions/workflows/e2e.yml/badge.svg)

An end-to-end (E2E) UI test automation project for the Swag Labs [SauceDemo](https://www.saucedemo.com/) e-commerce application, built using **WebdriverIO** and **JavaScript**. The project follows the **Page Object Model (POM)** design pattern for scalability and maintainability.

---

## 🚀 Key Features & Test Scenarios

- **Authentication & Authorization:**
  - Successful login with valid credentials.
  - Negative testing: invalid credentials, locked-out user handling, empty required fields.
  - Access control: the inventory page cannot be opened without logging in.

- **Inventory & Shopping Cart:**
  - Product sorting by name (Z-A) and price (Low to High).
  - Adding items to the shopping cart.
  - Removing items from the shopping cart.
  - Verification of cart badge updates.

- **Checkout Workflow:**
  - End-to-end checkout flow, from cart reviewing to order confirmation.
  - Required fields validation on the checkout information form.
  - Verification of the order summary and successful order completion.

---

## 🛠️ Tech Stack & Design Patterns

- **Language:** JavaScript (ES6+)
- **Automation Framework:** WebdriverIO
- **Test Framework:** Mocha 
- **Design Pattern:** Page Object Model (POM)
- **Locator Strategy:** Data-test attributes (CSS selectors); XPath for finding an item button by product name
- **Runtime:** Node.js
- **Package Manager:** npm
- **Version Control:** Git and GitHub

---

## 📂 Project Structure

```text
.
├── test/
│   ├── data/
│   │   └── users.js
│   ├── pageobjects/
│   │   ├── login.page.js
│   │   ├── inventory.page.js
│   │   ├── cart.page.js
│   │   └── checkout.page.js
│   └── specs/
│       ├── login.spec.js
│       ├── inventory.spec.js
│       ├── cart.spec.js
│       └── checkout.spec.js
├── wdio.conf.js
├── package.json
├── package-lock.json
└── README.md
```


---

## ⚙️ Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

---

## 📦 Installation & Execution

1. **Clone the repository:**

```bash
git clone https://github.com/UlianaStah/webdriverio-saucedemo-automation.git
cd webdriverio-saucedemo-automation
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run tests:**
```bash
npm test
```