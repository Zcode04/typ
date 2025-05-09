'use client'

import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { X, ThumbsUp, ThumbsDown } from "lucide-react";
import { client, urlFor, SanityImage } from "@/lib/SanityClient";

interface TextBlock {
  children: {
    text: string;
    _key?: string;
    _type?: string;
    marks?: string[];
  }[];
  _key?: string;
  _type?: string;
  style?: string;
}

interface Post {
  _id: string;
  title: string;
  mainImage: SanityImage;
  body: TextBlock[];
}

export default function CardWithModal() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [likedIndex, setLikedIndex] = useState<number | null>(null);
  const [dislikedIndex, setDislikedIndex] = useState<number | null>(null);

  // جلب الأخبار من Sanity
  useEffect(() => {
    async function fetchPosts() {
      const query = `
        *[_type=="post"] | order(publishedAt desc){
          _id, title, mainImage, body
        }
      `;
      const data = await client.fetch<Post[]>(query);
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">

                        {/*  header */}  
  <div className="absolute inset-3   justify-center size-full">

  <div className="flex top-0 right-4  justify-center">    <nav className=" px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">  
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">  <li className="inline-flex items-center">  
      <Link href="/" className="inline-flex items-center text-sm font-medium text-black hover:text-green-500 dark:text-green-500 dark:hover:text-white">  
         
        رياضة  

      </Link>  
    </li>  


    <li>  
      <div className="flex items-center">  
          
        <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">  
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>  
        </svg>  
        <Link href="/" className="inline-flex items-center text-sm font-medium text-green-500 hover:text-white dark:text-white dark:hover:text-green-500">  
        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">  
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>  
        </svg>  
        كنكوصه ميديا  
      </Link>  
          
      </div>  
    </li>  
    <li aria-current="page">  
      <div className="flex items-center">  
        <svg className="ltr:rotate-180 w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">  
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>  
        </svg>  
        
        <Link href="/" className="inline-flex items-center text-sm font-medium text-black hover:text-green-500 dark:text-green-500 dark:hover:text-white">  
         
       الأخبار  
     </Link>  
      </div>  
    </li>  





  </ol>  
</nav>  
    <DarkThemeToggle />  
      
  </div>  
  </div>  
                          {/*   header */}  








      {/* logo */}
      <div className="relative h-full w-full select-none">
        <Image
          unoptimized
          className="w-full items-center"
          alt="Pattern Light"
          src="/s.svg"
          width={803}
          height={774}
        />
      </div>
      {/* //logo// */}

      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-12">







{/* card list */}
<div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {posts.map((post, idx) => (
    <div key={post._id} className="relative">
      {/* Add animation keyframes at the top of your CSS or in your global styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      {/* card */}
      <div
        onClick={() => setOpenIndex(idx)}
        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 cursor-pointer h-full"
      >
        <div className="rounded-t-lg overflow-hidden">
          <Image
            unoptimized
            src={urlFor(post.mainImage).width(300).url()}
            alt={post.title}
            width={300}
            height={170}
            className="object-cover w-full h-40 hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm line-clamp-2 h-10 overflow-hidden">
            {post.body[0]?.children[0]?.text || ''}
          </p>
          <div className="text-blue-500 text-xs font-medium hover:underline mb-2">اقرأ المزيد...</div>
          {/* like/dislike */}
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLikedIndex(likedIndex === idx ? null : idx);
                if (dislikedIndex === idx) setDislikedIndex(null);
              }}
              className="flex items-center gap-1"
            >
              <ThumbsUp
                size={18}
                className={likedIndex === idx ? "text-green-500" : "text-gray-400"}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDislikedIndex(dislikedIndex === idx ? null : idx);
                if (likedIndex === idx) setLikedIndex(null);
              }}
              className="flex items-center gap-1"
            >
              <ThumbsDown
                size={18}
                className={dislikedIndex === idx ? "text-red-500" : "text-gray-400"}
              />
            </button>
          </div>
        </div>
      </div>
      {/* modal */}
      {openIndex === idx && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg max-w-md w-full shadow-lg overflow-hidden animate-fadeIn"
            style={{ maxHeight: "80vh" }}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                unoptimized
                src={urlFor(post.mainImage).width(500).url()}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="w-full"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-xl font-bold text-white">
                  {post.title}
                </h2>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex(null);
                }}
                className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 overflow-y-auto" style={{ maxHeight: "calc(80vh - 12rem)" }}>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {post.body.map(b => b.children.map(c => c.text).join(' ')).join(' ')}
              </p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setOpenIndex(null)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ))}
</div>
{/* //card list// */}














        {/* footer */}
        <div className="relative flex w-full flex-col  items-start gap-6 self-stretch">
          <Image
            unoptimized
            className="w-full items-center"
            alt="Pattern Light"
            src="/fo.png"
            width={803}
            height={774}
          />
        </div>
        {/* //footer// */}
      </div>
    </main>
  );
}