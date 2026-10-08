// Gallery images: public/images/gallery/01.jpg, 02.jpg … Add or remove entries to change the count.

export const gallery = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')
  return { src: `/images/gallery/${number}.jpg`, caption: `Gallery ${number}` }
})
