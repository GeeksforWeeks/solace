import productsData from '@/data/products.json';
import { Product } from '@/types';

/**
 * Service to fetch product data.
 * Currently reads from static products.json.
 * 
 * Future Firestore Integration Template:
 * 
 * 1. Install Firebase SDK:
 *    npm install firebase
 * 
 * 2. Create `lib/firebase.ts` with your config:
 *    import { initializeApp } from 'firebase/app';
 *    import { getFirestore } from 'firebase/firestore';
 * 
 *    const firebaseConfig = {
 *      apiKey: "YOUR_API_KEY",
 *      authDomain: "YOUR_PROJECT.firebaseapp.com",
 *      projectId: "YOUR_PROJECT_ID",
 *      storageBucket: "YOUR_PROJECT.appspot.com",
 *      messagingSenderId: "SENDER_ID",
 *      appId: "APP_ID"
 *    };
 * 
 *    const app = initializeApp(firebaseConfig);
 *    export const db = getFirestore(app);
 * 
 * 3. Update this function:
 *    import { db } from './firebase';
 *    import { collection, getDocs } from 'firebase/firestore';
 * 
 *    export async function getProducts(): Promise<Product[]> {
 *      const productsCol = collection(db, 'products');
 *      const productSnapshot = await getDocs(productsCol);
 *      const productList = productSnapshot.docs.map(doc => ({
 *        id: doc.id,
 *        ...doc.data()
 *      })) as Product[];
 *      return productList;
 *    }
 */
export async function getProducts(): Promise<Product[]> {
  return productsData as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(p => p.slug === slug);
}
