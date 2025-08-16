export const metadata = {
    title: "About Us | Zee Rodium",
    description:
      "Founded in 1998 in Jaipur, India, Zee Rodium leads the electroplating industry and pioneers conductive paint for non-conductive surfaces.",
  }
  
  export default function AboutUsPage() {
    return (
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <section className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-black">About Us</h1>
  
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded in 1998 in Jaipur, India, Zee Rodium has been a trusted leader in the electroplating
                industry, delivering premium-quality metal finishing with precision and reliability. Over the
                years, our dedication to innovation inspired us to address one of the industry’s greatest
                challenges — the restriction of electroplating to only electro-conductive materials.
              </p>
  
              <p>
                To overcome this, Zee Rodium developed a revolutionary conductive paint that transforms any
                non-conductive surface into an electro-conductive one. This breakthrough technology allows us to
                apply long-lasting metallic finishes on a wide range of materials, including:
              </p>
  
              <ul className="list-disc pl-6 space-y-1 text-black">
                <li>Wood</li>
                <li>Plastic</li>
                <li>Stone</li>
                <li>Ceramics</li>
                <li>Sculptures &amp; Statues</li>
              </ul>
  
              <p>
                This easy-to-apply paint opens up exciting possibilities for artists, designers, and
                manufacturers, enabling them to achieve a premium metallic look on virtually any object.
              </p>
  
              <p>
                Beyond design, our conductive paint also finds applications in electronics, offering innovative
                solutions for creating conductive pathways on non-traditional substrates.
              </p>
  
              <p>
                At Zee Rodium Jaipur, we are proud to be pushing the boundaries of electroplating and creating
                solutions that unlock a world of creative, industrial, and technological opportunities.
              </p>
            </div>
          </section>
        </main>
  
        <footer className="bg-black text-white mt-12 sm:mt-20 rounded-4xl border-[15px]">
          <div className="max-w-6xl py-8 bg-black mx-3.5 my-0 px-6 border-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="font-bold text-4xl sm:text-6xl lg:text-9xl">Zee Rodium ©</div>
                <div className="flex flex-col sm:flex-row sm:gap-8 gap-2 text-xs sm:text-sm text-gray-400">
                  <span>37°47'33.4"N 122°24'18.6"W</span>
                  <span>(269) 682-1402</span>
                  <span>Instagram</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-400 lg:text-right">2025© — All rights reserved</div>
            </div>
          </div>
        </footer>
      </div>
    )
  }