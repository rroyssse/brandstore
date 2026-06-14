import { createContext, useContext, useEffect, useState } from 'react';
import { findDictionaryTranslation } from './utils/translationDictionary';

const translations = {
  en: {
    app: {
      brand: 'EtnoWear',
      language: 'Language',
      languageEnglish: 'English',
      languageUkrainian: 'Ukrainian',
      categories: 'Categories',
      admin: 'Admin',
      footer: '2026 EtnoWear',
    },
    nav: {
      cart: 'Cart',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      userProfile: 'User Profile',
      orderHistory: 'Order History',
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      users: 'Users',
    },
    common: {
      any: 'Any',
      no: 'No',
      edit: 'Edit',
      details: 'Details',
      delete: 'Delete',
      create: 'Create',
      update: 'Update',
      continue: 'Continue',
      results: 'Results',
      clear: 'Clear',
      loadingChart: 'Loading Chart...',
    },
    search: {
      placeholder: 'search products...',
      title: 'Search Products',
      category: 'Category',
      price: 'Price',
      brand: 'Brand',
      fabric: 'Fabric',
      availability: 'Availability',
      noProductFound: 'No Product Found',
      newestArrivals: 'Newest Arrivals',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      sortBy: 'Sort by',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      priceRanges: {
        low: '$1 to $50',
        mid: '$51 to $200',
        high: '$201 to $1000',
      },
      summary: {
        price: 'Price',
        brand: 'Brand',
        fabric: 'Fabric',
      },
    },
    product: {
      addToCart: 'Add to cart',
      addToCartTitle: 'Add to Cart',
      outOfStock: 'Out of stock',
      unavailable: 'Unavailable',
      brand: 'Brand',
      description: 'Description',
      price: 'Price',
      status: 'Status',
      outOfStockAlert: 'Sorry. Product is out of stock',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Cart is empty.',
      goShopping: 'Go Shopping',
      total: 'Total',
      items: 'items',
      proceedToCheckout: 'Proceed to Checkout',
    },
    auth: {
      email: 'Email',
      password: 'Password',
      name: 'Name',
      confirmPassword: 'Confirm Password',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      newCustomer: 'New customer?',
      createAccount: 'Create your account',
      alreadyHaveAccount: 'Already have an account?',
      passwordsDoNotMatch: 'Passwords do not match',
    },
    checkout: {
      signIn: 'Sign-In',
      shipping: 'Shipping',
      payment: 'Payment',
      placeOrder: 'Place Order',
      shippingAddress: 'Shipping Address',
      fullName: 'Full Name',
      country: 'Country',
      city: 'City',
      address: 'Address',
      postalCode: 'Postal Code',
      paymentMethod: 'Payment Method',
      paymentOnReceipt: 'Payment on Receipt',
      previewOrder: 'Preview Order',
      items: 'Items',
      discounts: 'Discounts',
      orderTotal: 'Order Total',
      placeOrderButton: 'Place Order',
      method: 'Method',
    },
    order: {
      title: 'Order',
      shipping: 'Shipping',
      payment: 'Payment',
      items: 'Items',
      orderSummary: 'Order Summary',
      deliveredAt: 'Delivered at',
      notDelivered: 'Not Delivered',
      paidAt: 'Paid at',
      notPaid: 'Not Paid',
      deliverOrder: 'Deliver Order',
      orderPaid: 'Order is paid',
      orderDelivered: 'Order is delivered',
      name: 'Name',
      address: 'Address',
      method: 'Method',
    },
    dashboard: {
      title: 'Dashboard',
      users: 'Users',
      orders: 'Orders',
      sales: 'Sales',
      categories: 'Categories',
      noSale: 'No Sale',
      noCategory: 'No Category',
      chart: {
        date: 'Date',
        category: 'Category',
        products: 'Products',
      },
    },
    admin: {
      productList: 'Product List',
      createProduct: 'Create Product',
      editUser: 'Edit User',
    },
    profile: {
      title: 'User Profile',
      update: 'Update',
    },
  },
  uk: {
    app: {
      brand: 'EtnoWear',
      language: 'Мова',
      languageEnglish: 'Англійська',
      languageUkrainian: 'Українська',
      categories: 'Категорії',
      admin: 'Адмін',
      footer: '2026 EtnoWear',
    },
    nav: {
      cart: 'Кошик',
      signIn: 'Увійти',
      signOut: 'Вийти',
      userProfile: 'Профіль',
      orderHistory: 'Історія замовлень',
      dashboard: 'Панель',
      products: 'Товари',
      orders: 'Замовлення',
      users: 'Користувачі',
    },
    common: {
      any: 'Будь-які',
      no: 'Немає',
      edit: 'Редагувати',
      details: 'Деталі',
      delete: 'Видалити',
      create: 'Створити',
      update: 'Оновити',
      continue: 'Продовжити',
      results: 'результатів',
      clear: 'Очистити',
      loadingChart: 'Завантаження графіка...',
    },
    search: {
      placeholder: 'пошук товарів...',
      title: 'Пошук товарів',
      category: 'Категорія',
      price: 'Ціна',
      brand: 'Бренд',
      fabric: 'Тканина',
      availability: 'Наявність',
      noProductFound: 'Товарів не знайдено',
      newestArrivals: 'Нові надходження',
      priceLowToHigh: 'Ціна: від меншої до більшої',
      priceHighToLow: 'Ціна: від більшої до меншої',
      sortBy: 'Сортувати за',
      inStock: 'Є в наявності',
      outOfStock: 'Немає в наявності',
      priceRanges: {
        low: '$1 до $50',
        mid: '$51 до $200',
        high: '$201 до $1000',
      },
      summary: {
        price: 'Ціна',
        brand: 'Бренд',
        fabric: 'Тканина',
      },
    },
    product: {
      addToCart: 'Додати в кошик',
      addToCartTitle: 'Додати в кошик',
      outOfStock: 'Немає в наявності',
      unavailable: 'Недоступно',
      brand: 'Бренд',
      description: 'Опис',
      price: 'Ціна',
      status: 'Статус',
      outOfStockAlert: 'Вибачте. Товар закінчився',
    },
    cart: {
      title: 'Кошик',
      empty: 'Кошик порожній.',
      goShopping: 'Перейти до покупок',
      total: 'Разом',
      items: 'товарів',
      proceedToCheckout: 'Оформити замовлення',
    },
    auth: {
      email: 'Email',
      password: 'Пароль',
      name: "Ім'я",
      confirmPassword: 'Підтвердіть пароль',
      signIn: 'Увійти',
      signUp: 'Реєстрація',
      newCustomer: 'Новий покупець?',
      createAccount: 'Створіть обліковий запис',
      alreadyHaveAccount: 'Вже маєте акаунт?',
      passwordsDoNotMatch: 'Паролі не збігаються',
    },
    checkout: {
      signIn: 'Вхід',
      shipping: 'Доставка',
      payment: 'Оплата',
      placeOrder: 'Замовлення',
      shippingAddress: 'Адреса доставки',
      fullName: "Повне ім'я",
      country: 'Країна',
      city: 'Місто',
      address: 'Адреса',
      postalCode: 'Поштовий індекс',
      paymentMethod: 'Спосіб оплати',
      paymentOnReceipt: 'Оплата при отриманні',
      previewOrder: 'Перевірка замовлення',
      items: 'Товари',
      discounts: 'Знижки',
      orderTotal: 'Сума замовлення',
      placeOrderButton: 'Оформити замовлення',
      method: 'Спосіб',
    },
    order: {
      title: 'Замовлення',
      shipping: 'Доставка',
      payment: 'Оплата',
      items: 'Товари',
      orderSummary: 'Підсумок замовлення',
      deliveredAt: 'Доставлено',
      notDelivered: 'Не доставлено',
      paidAt: 'Оплачено',
      notPaid: 'Не оплачено',
      deliverOrder: 'Позначити доставленим',
      orderPaid: 'Замовлення оплачено',
      orderDelivered: 'Замовлення доставлено',
      name: "Ім'я",
      address: 'Адреса',
      method: 'Спосіб',
    },
    dashboard: {
      title: 'Панель керування',
      users: 'Користувачі',
      orders: 'Замовлення',
      sales: 'Продажі',
      categories: 'Категорії',
      noSale: 'Немає продажів',
      noCategory: 'Немає категорій',
      chart: {
        date: 'Дата',
        category: 'Категорія',
        products: 'Товари',
      },
    },
    admin: {
      productList: 'Список товарів',
      createProduct: 'Створити товар',
      editUser: 'Редагувати користувача',
    },
    profile: {
      title: 'Профіль користувача',
      update: 'Оновити',
    },
  },
};

const valueTranslations = {
  category: {
    uk: {
      Corsets: 'Корсети',
      Dresses: 'Сукні',
      Hoodies: 'Худі',
      Outerwear: 'Верхній одяг',
      Shirts: 'Сорочки',
      Suits: 'Костюми',
    },
  },
  fabric: {
    uk: {
      Cotton: 'Бавовна',
      'Cotton blend': 'Суміш бавовни',
      'Cotton twill': 'Бавовняний твіл',
      Denim: 'Денім',
      'Eco leather blend': 'Екошкіра',
      Hemp: 'Конопляна тканина',
      Linen: 'Льон',
      'Linen blend': 'Лляна суміш',
      Viscose: 'Віскоза',
      'Viscose blend': 'Суміш віскози',
    },
  },
  paymentMethod: {
    uk: {
      PayPal: 'PayPal',
      PaymentOnReceipt: 'Оплата при отриманні',
    },
    en: {
      PaymentOnReceipt: 'Payment on Receipt',
    },
  },
};

const defaultI18n = {
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  tv: (_type, value) => value,
  translateTerm: (_value) => _value,
  dictionaryEntries: [],
};

const getTranslationByPath = (language, key) => {
  const languageTranslations = translations[language] || translations.en;
  return key
    .split('.')
    .reduce(
      (value, segment) =>
        value && value[segment] !== undefined ? value[segment] : undefined,
      languageTranslations
    );
};

export const I18nContext = createContext(defaultI18n);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(
    localStorage.getItem('language') || 'en'
  );
  const [dictionaryEntries, setDictionaryEntries] = useState([]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    let ignore = false;

    const loadDictionaryEntries = async () => {
      try {
        const response = await fetch('/api/translations?domain=fashion');
        const data = await response.json();

        if (!ignore) {
          setDictionaryEntries(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!ignore) {
          setDictionaryEntries([]);
        }
      }
    };

    loadDictionaryEntries();

    return () => {
      ignore = true;
    };
  }, []);

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage);
    localStorage.setItem('language', nextLanguage);
  };

  const t = (key) =>
    getTranslationByPath(language, key) ??
    getTranslationByPath('en', key) ??
    key;

  const tv = (type, value) => {
    if (!value) {
      return value;
    }

    const dictionaryKinds = new Set(['category', 'fabric', 'color', 'tag']);

    if (dictionaryKinds.has(type)) {
      const dictionaryMatch = findDictionaryTranslation({
        entries: dictionaryEntries,
        term: value,
        from: 'en',
        to: language,
        kind: type,
      });

      if (dictionaryMatch?.target) {
        return dictionaryMatch.target;
      }
    }

    return (
      valueTranslations[type]?.[language]?.[value] ??
      valueTranslations[type]?.en?.[value] ??
      value
    );
  };

  const translateTerm = (value, options = {}) => {
    if (!value) {
      return value;
    }

    const from = options.from || 'en';
    const to = options.to || language;
    const kind = options.kind;

    const dictionaryMatch = findDictionaryTranslation({
      entries: dictionaryEntries,
      term: value,
      from,
      to,
      kind,
    });

    return dictionaryMatch?.target || value;
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        tv,
        translateTerm,
        dictionaryEntries,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export const useTranslation = () => useContext(I18nContext);
