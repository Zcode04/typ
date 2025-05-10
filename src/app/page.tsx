'use client'

import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { X, ThumbsUp, ThumbsDown, Calendar } from "lucide-react";
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
  publishedAt: string;
}

export default function CardWithModal() {
  const images = [
    { src: "/br.jpg", alt: "Post 36" },
    { src: "/bn.jpg", alt: "Post 40" },
    { src: "/bm.jpg", alt: "Post 50" }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((index + 1) % images.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [index]);

  const prevSlide = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex((index + 1) % images.length);
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [likedIndex, setLikedIndex] = useState<number | null>(null);
  const [dislikedIndex, setDislikedIndex] = useState<number | null>(null);

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // جلب الأخبار من Sanity
  useEffect(() => {
    async function fetchPosts() {
      const query = `
        *[_type=="post"] | order(publishedAt desc){
          _id, title, mainImage, body, publishedAt
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
      <div className="absolute inset-3 justify-center size-full dir=ltr">
        <div className="flex top-0 right-4 dir=ltr justify-center">    
          <nav className="px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">  
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">  
              <li className="inline-flex items-center">  
                <Link href="/" className="inline-flex items-center text-sm font-medium text-black hover:text-green-500 dark:text-green-500 dark:hover:text-white">  
                  الأخبار
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
                    مقالات
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
        {/* الكاروسيل */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full mx-auto my-8 shadow-2xl">
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="relative w-full h-full">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === i ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-40"></div>
          </div>

          {/* أزرار التنقل */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-grey-100 bg-opacity-30 backdrop-blur-sm text-white border border-white border-opacity-30 shadow-lg hover:bg-opacity-50 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-grey-100 bg-opacity-30 backdrop-blur-sm text-white border border-white border-opacity-30 shadow-lg hover:bg-opacity-50 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* مؤشرات */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-white w-6' : 'bg-white bg-opacity-60 hover:bg-opacity-100'}`}
              />
            ))}
          </div>

          {/* رقم الصورة */}
          <div className="absolute top-4 right-4 bg-green-500 bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
            {index + 1}/{images.length}
          </div>
        </div>
      </div>
      {/* //logo// */}

      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-12">
        {/* card list */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 dir=rtl">
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
                  {/* إضافة عنصر تاريخ النشر هنا */}
                  <div className="flex items-center mb-3 text-gray-500 dark:text-gray-400 text-xs">
                    <Calendar size={14} className="ml-1" />
                    <span dir="rtl">{formatDate(post.publishedAt)}</span>
                  </div>
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
                        {/* إضافة تاريخ النشر في النافذة المنبثقة */}
                        <div className="flex items-center mt-2 text-white/80 text-sm">
                          <Calendar size={16} className="ml-1" />
                          <span dir="rtl">{formatDate(post.publishedAt)}</span>
                        </div>
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
        <div className="relative flex w-full flex-col items-start gap-6 self-stretch">
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