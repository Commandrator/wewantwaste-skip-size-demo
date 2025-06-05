# About the Project

This project was prepared for an interview and is assumed to be non-commercial. It was developed by **Talha Yaşar** according to the following requirements:

```
Your goal is to redesign the whole page to look completely different from the original page. You should keep its functionality intact.

- Focus on clean, maintainable React code, responsiveness, and UI/UX improvements.
- You need to incorporate the page to display correctly on mobile web browsers and desktop.
- Use the data from this link to populate the skip options: "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
```

The application is developed as a Single Page Application (SPA). Since the project is fast and up-to-date, it is built on **Vite**. To simplify styling, **Tailwind CSS** is integrated, and for module safety, **TypeScript** libraries are used throughout the project.

## **Scripts (package.json)**
These npm scripts are used for development, building, linting, and previewing the project:

* **dev**: Starts the development server with live reload for fast development.
* **build**: Compiles TypeScript files and bundles the project for production using Vite.
* **lint**: Runs ESLint to check code quality.
* **preview**: Serves the production build locally for testing.


## main.tsx

To facilitate data exchange between different languages and modules, I created a context using `useContext`.

### Languages from `src/lang/index.tsx`

The project supports multiple languages based on the browser's language. In `src/lang/index.tsx`, I defined an object structure that provides corresponding translations for each supported language. By default, English (`en`) is selected in `main.tsx`.
This design increases user experience by detecting the browser language instead of hardcoding the text.

```ts
const languages = {
  [language]: {
    [english_text]: [translated_text],
  },
};
export default languages;
```

### AppProvider from `src/contexts/app.provider.tsx`

`AppProvider` is a React Context provider that manages global state such as navigation status, product selection, and fetching products from the API.

- Manages current page (`page`) and step (`pageIndex`) states.
- Fetches products from the API, transforms them into `Product` instances, and stores them in `productResult`.
- Manages the selected product (`selectedProduct`).
- Determines the current page component (`Page`) from the `navbarItems` list.
- Provides helper functions to handle page changes and product selection.

| Field                 | Description                                         |
| --------------------- | --------------------------------------------------- |
| `page`                | Current page ID                                     |
| `pageIndex`           | Current step number (for wizard-like flows)         |
| `handleChangePage`    | Updates page and step info (`(index, id?) => void`) |
| `loaded`              | Indicates if products are loaded                    |
| `productResult`       | List of products fetched from API                   |
| `selectedProduct`     | Currently selected product                          |
| `listProduct()`       | Fetches product list from API and stores it         |
| `handleSelectProduct` | Selects a product (`(product: Product) => void`)    |
| `handleDialogClose()` | Closes the product detail dialog                    |
| `handleSelect`        | Handles product selection and navigates accordingly |
| `Page`                | The current page React component                    |

---

## App.tsx from `src/App.tsx`

`App` is the main React component that structures the app’s layout and dynamically renders the appropriate page component.

- It retrieves the current page component (`Page`) from `AppContext`.
- Contains desktop (`NavbarDesktop`) and mobile (`NavbarMobile`) navigation components.
- Uses responsive layout to flexibly display page content.

| Component       | Description                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| `NavbarDesktop` | Fixed navigation menu for large screens.                                                                |
| `NavbarMobile`  | Mobile-friendly horizontal navigation menu for small screens.                                           |
| `Page`          | Dynamic page component based on user interaction; rendered using `createElement(Page)` for flexibility. |

- If `Page` is `undefined`, nothing is rendered (`null` returned).
- `createElement(Page)` is used to dynamically render components without JSX.

---

## Navigation Components

Designed for step-by-step app flow, with separate versions for desktop and mobile devices.

### NavbarMobile from `src/components/navbar.tsx`

- Horizontal buttons for mobile screens with icons representing steps.
- Uses `scrollRef` to manage horizontal scrolling.
- Provides `scrollLeft()` and `scrollRight()` to shift the navigation view.
- `NavbarItem` components represent each step.
- Disabled steps are inaccessible and styled accordingly.

### NavbarDesktop from `src/components/navbar.tsx`

- Vertically aligned sticky menu on the left for desktop.
- Includes a decorative vertical line (`w-px`) on the left side.
- Uses shared `NavbarItem` components with icons and text.
- Disabled steps appear faded and cannot be clicked.
- Supports dark mode styles.
- Clicking a step triggers `handleChangePage` for navigation.

### navbarItems from `src/components/navbar.items.tsx`

An array representing the app’s step-by-step process. Each item contains icon, text key, and optional page component.
Only the `select-skip` page is implemented; other pages can be added to automatically register in the flow.

| ID             | Icon          | Text Key                     | Page Component |
| -------------- | ------------- | ---------------------------- | -------------- |
| `postcode`     | `Postcode`    | `"navbar_item_postcode"`     | `null`         |
| `waste-type`   | `WasteType`   | `"navbar_item_waste_type"`   | `null`         |
| `select-skip`  | `SelectSkip`  | `"navbar_item_select_skip"`  | `SkipSizePage` |
| `permit-check` | `PermitCheck` | `"navbar_item_permit_check"` | `null`         |
| `choose-date`  | `ChooseDate`  | `"navbar_item_choose_date"`  | `null`         |
| `payment`      | `Payment`     | `"navbar_item_payment"`      | `null`         |

---

## Pages Folder from `src/pages`

This folder contains page components referenced in `navbarItems`, organized for clarity.

### skip.size.page.tsx from `src/pages/skip.size.page.tsx`

- The page where the user selects a product (skip).
- On load, fetches product list via `listProduct()`.
- Displays products in a card-based grid layout.
- If a product is selected, shows a detail dialog (`ProductDialog`).
- Shows a loading animation (`Loader`) while data is fetching.

| Field             | Description                 |
| ----------------- | --------------------------- |
| `listProduct()`   | Fetches the product list    |
| `loaded`          | Indicates if data is loaded |
| `productResult`   | The product data array      |
| `selectedProduct` | The currently selected item |

---

## ContentLayer from `src/components/content.layer`

A wrapper component for page content including title, subtitle, and children.

- Renders the title as `<h2>` if provided.
- Subtitle is displayed with a muted color.
- Contains the main content area (`children`).

---

## ProductDialog from `src/components/product.dialog`

Modal dialog displaying detailed product information and handling user interactions.

- Uses `useRef` to detect clicks outside the modal to close it.
- Uses `useEffect` to disable page scroll while modal is open.
- Closes modal and selects product via context functions (`handleDialogClose`, `handleSelect`).
- Displays product info grouped by `section` objects, making the UI modular and extensible.
- Responsive layout using flexbox and grid.
- Supports light/dark themes with modular CSS classes.

### InfoGrid

Reusable component for displaying key-value pairs in grid format.

---

## ProductCard from `src/components/product.card`

Interactive card showing product visuals and key info.

- Displays product image, size, rental period, and price.
- Clicking image or title opens detail modal (`handleSelectProduct`).
- "Select" button selects product globally (`handleSelect`).
- Hover effects and responsive grid layout for better UX.
- Uses context functions for global state management.
- Emphasizes buttons and alerts for clearer user guidance.
