"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Stars, PresentationControls } from "@react-three/drei"
import Image from "next/image"
import { Heart } from "lucide-react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const sectionIndex = Math.floor(scrollPosition / windowHeight)

      setActiveSection(sectionIndex)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const storyParts = [
    {
      title: "The Unspoken Excitement",
      quote: "She stepped out like the sun after rain — quiet, radiant, unforgettable.",
      story:
        'She wasn\'t answering her phone, so I rode to her house, heart racing. Her sister said she was in the shower. Moments later, she called me in. Dressed in grace and nervous smiles, she asked, "How do I look?" I was speechless, because how do you describe someone who just stole your heartbeat?',
      image: "/anime-romcom.jpeg?height=400&width=300",
    },
    {
      title: "The Forgotten Glasses, The Wild Ride",
      quote: "Sometimes love is a wild ride, and the destination is the sound of her laugh in the wind.",
      story:
        "We left for the movie, excited and dreamy. A few minutes into the ride, she gasped — she forgot her glasses. We couldn't go back, so I rode faster, weaving through traffic, chasing time. Her laughter rode the wind behind me.",
      image: "/bike-ride-3.jpg?height=400&width=300",
    },
    {
      title: "The Secret Juice & Stolen Glances",
      quote: "Between the lights of the cinema and the silence of held hands, our hearts whispered their first secret.",
      story:
        "We made it to the movie. I handed her my sunglasses — a small, sweet shield. And inside? A bottle of juice hidden in my water flask — a secret adventure just for us. During the interval, we talked, laughed… and when the movie resumed, I reached out and finally held her hand. I didn't let go till the end.",
      image: "/Suzume.jpeg?height=400&width=300",
    },
    {
      title: "Little Wheels, Big Memories",
      quote: "She spoke of her childhood, and suddenly, I saw the girl she once was — and the magic she still carries.",
      story:
        "Leaning over the mall railings, she looked down at the tiny rides below — toy cars and kiddie bikes. Her eyes sparkled with innocence as she told me how she used to visit with her dad. \"I'd beg him for just one more ride,\" she said, smiling. I didn't say a word—I just stared, completely mesmerized.",
      image: "/Asawari-1.jpeg?height=400&width=300",
    },
    {
      title: "The Burger That Wasn't",
      quote: "It's not what we eat that fills us — it's the anticipation of something special.",
      story:
        "We were hungry and there was a Burger King nearby. She loves burgers. But I had a surprise in store and didn't want to break the flow. So I smiled, and we moved on, stomachs growling but hearts full.",
      image: "/burger.jpeg?height=400&width=300",
    },
    {
      title: "The Holy Bangles",
      quote: "A blessed bangle on her wrist, and a prayer in my heart — may she always smile like this.",
      story:
        "I took her to the Gurudwara. Peaceful. Serene. I bought her a bangle, gave it to the priest to bless it, and then slid it onto her wrist. Her eyes shimmered. Her smile… oh, her smile could light a thousand candles.",
      image: "/Asawari-2.jpeg?height=400&width=300",
    },
    {
      title: "Chola-Kulcha & Soda Sips",
      quote: "Love, like soda, tickles the soul and lingers in laughter.",
      story:
        "We devoured chola kulcha in IT Park, sharing stories and spicy bites. Then, sipping soda, we laughed at how fizzy love can taste on the tongue.",
      image: "/shubi's.jpeg?height=400&width=300",
    },
    {
      title: "The Court of Joy",
      quote: "While I played with children, she played with my heart — click by click.",
      story:
        "At the basketball court, I joined some kids in a quick game. She clicked pictures — capturing my joy, my silliness, and everything in between. I kept looking at her, hoping she'd never stop smiling.",
      image: "/basketball-court-1.jpeg?height=400&width=300",
    },
    {
      title: "The Softie Surprise",
      quote: "The softest moments come wrapped in silence and sugar.",
      story:
        "A simple softie cone — cold, sweet, and unexpected. Another surprise she didn't see coming. We sat quietly, savoring each bite and the warmth in our hearts.",
      image: "/softie.jpg?height=400&width=300",
    },
    {
      title: "The Terrace Hug",
      quote: "That hug didn't just end the night — it wrapped a memory in forever.",
      story:
        'Back at her home. We went to the terrace, walking under the stars. I sat, and she stood behind me — quiet, thoughtful. Downstairs, I asked, "Don\'t you want a hug?" She did. We hugged in front of the cooler — warm arms, cold breeze, and something eternal between us. She kept admiring her bangle. I kept admiring her.',
      image: "/anime-hug.jpg?height=400&width=300",
    },
    {
      title: "Our Forever Has Just Begun",
      quote:
        "That was our first page — of a love story still being written, one smile, one hug, one heartbeat at a time.",
      story:
        "And as the night ended, she hugged me under the cooler breeze… her bangles jingling softly, her heart glowing—just like mine. That was the first page of our forever.",
      image: "/forever begun.jpg?height=400&width=300",
    },
  ]

  return (
    <main className="relative" ref={containerRef}>
      <IntroSection />

      {storyParts.map((part, index) => (
        <StorySection
          key={index}
          title={part.title}
          quote={part.quote}
          story={part.story}
          image={part.image}
          index={index}
          isActive={index === activeSection}
        />
      ))}

      <OutroSection />
    </main>
  )
}



function IntroSection() {
  const [showModel, setShowModel] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // Load Spline viewer script
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.85/build/spline-viewer.js"
    script.type = "module"
    script.async = true
    document.body.appendChild(script)

    // Show model after 2 seconds
    const modelTimeout = setTimeout(() => setShowModel(true), 0)

    // Show text after 5 seconds
    const textTimeout = setTimeout(() => setShowText(true), 2000)

    return () => {
      document.body.removeChild(script)
      clearTimeout(modelTimeout)
      clearTimeout(textTimeout)
    }
  }, [])

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* Spline 3D Model - Fades In */}
      {showModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <spline-viewer url="https://prod.spline.design/nxZVjloOXkaNN6aq/scene.splinecode"></spline-viewer>
        </motion.div>
      )}

      {/* Header Title */}
      {showText && (
        <motion.div
          className="absolute top-8 w-full text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* <h1 className="text-4xl md:text-6xl font-dancing text-pink-800">Our First Date</h1> */}
        </motion.div>
      )}

      {/* Footer Text */}
      {showText && (
        <motion.div
          className="absolute bottom-12 w-full text-center z-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-lg md:text-xl font-playfair text-purple-700 max-w-2xl mx-auto">
            A story of stolen glances, blessed bangles, and the beginning of forever.
          </p>

          <motion.div
            className="mt-6"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <p className="text-pink-500 text-sm">Scroll to begin our journey</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-pink-500 mx-auto mt-1"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}



function StorySection({ title, quote, story, image, index, isActive }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5])

  const isEven = index % 2 === 0
  const gradientColors = [
    "from-pink-50 to-purple-50",
    "from-lavender-50 to-blue-50",
    "from-rose-50 to-pink-50",
    "from-blue-50 to-purple-50",
    "from-pink-50 to-rose-50",
  ]

  const gradientClass = gradientColors[index % gradientColors.length]

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b ${gradientClass} py-20`}
    >
      <div className="absolute inset-0 opacity-20">
        <FloatingHearts count={20} />
      </div>

      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <motion.div
          className={`w-full md:w-1/2 order-2 ${isEven ? "md:order-2" : "md:order-1"}`}
          style={{ opacity, y }}
        >
          <h2 className="text-3xl md:text-4xl font-dancing text-pink-700 mb-6">{title}</h2>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-8">
            <p className="text-xl md:text-2xl font-playfair text-purple-800 italic mb-4">"{quote}"</p>
            <p className="text-gray-700 leading-relaxed">{story}</p>
          </div>
        </motion.div>

        <motion.div
          className={`w-full md:w-1/2 flex justify-center order-1 ${isEven ? "md:order-1" : "md:order-2"}`}
          style={{ opacity, scale, rotate }}
        >
          <div className="polaroid-container">
            <div className="polaroid">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={300}
                height={400}
                className="polaroid-image"
              />
              <div className="polaroid-caption font-dancing text-gray-700">{title}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}




function OutroSection() {
  // Inject the spline viewer script
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.85/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Fullscreen Spline 3D Model */}
      <div className="absolute inset-0 z-0">
      <spline-viewer url="https://prod.spline.design/RvMaQoyNRU2uwHbZ/scene.splinecode"></spline-viewer>
      </div>
      {/* Header Text (Overlay) */}
      <motion.div
        className="absolute top-12 w-full text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="text-4xl md:text-6xl font-dancing text-pink-800 drop-shadow-lg">
          Love Never Ends...
        </h1>
      </motion.div>

      {/* Footer Text (Overlay) */}
      <motion.div
        className="absolute bottom-16 w-full text-center z-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <p className="text-xl md:text-2xl font-playfair text-purple-800 drop-shadow max-w-2xl mx-auto">
          That was our first page — of a love story still being written, one smile, one hug, one heartbeat at a time.
        </p>
      </motion.div>
    </section>
  );
}


function FloatingHearts({ count = 10 }) {
  return (
    <div className="absolute inset-0 overflow-hidden z-10">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [null, "-20%"],
            x: [null, `${Math.sin(i) * 10}%`],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
        </motion.div>
      ))}
    </div>
  )
}



