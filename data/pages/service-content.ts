import type { ContentBlock } from "@/data/pages/types";
import type { ServiceSlug } from "@/lib/routes";

const SERVICE_TAGLINE =
  "The Most Reliable Moving Services For Businesses And Individuals Across The US";

export const SERVICE_CONTENT: Record<ServiceSlug, ContentBlock[]> = {
  "local-moving": [
    { type: "h2", text: SERVICE_TAGLINE },
    {
      type: "p",
      text: "Local moves can be just as complex as long-distance moves with the number of tasks that must be completed and the limited time-frames. However, with the help of our professional local movers by your side, you won't need to worry about any of the usual stresses related to moving. Dependable Movers will help you relocate to your new home or business in a timely and efficient manner!",
    },
    { type: "h2", text: "Get ready for your local move with Dependable Movers today!" },
    {
      type: "p",
      text: "Our company values customer satisfaction over everything else. We put our moving teams through rigorous training to ensure that they can handle your furniture and other items with care. We understand how stressful and tiresome the moving process can be, and our goal is to ensure that our customers don't have to go through such an experience.",
    },
    {
      type: "p",
      text: "We use only the highest quality packing materials and equipment to help us tackle challenging relocations with ease. You don't need to trouble yourself with packing, transporting, and moving your own items into your new home or office yourself—our top-notch movers have your back.",
    },
    {
      type: "p",
      text: "Make a simple phone call to our moving company to get a quote, then sit back and relax as we transport all your possessions in an easy, safe, and efficient manner. Our professional movers know all the shortcuts, streets, and regulations that will help move your belongings in record time.",
    },
    {
      type: "p",
      text: "Our services are completely personalized according to your requirements and needs. Every move is treated like an individual case where we work together to create a proper moving plan according to your schedule.",
    },
    {
      type: "p",
      text: "Our trained professionals at Dependable Movers can deal with a wide variety of items ranging from large pool tables to fragile china sets—we'll make sure to treat each of your belongings with the care and compassion they deserve.",
    },
    { type: "p", text: "Get in touch with us to find out more!" },
    {
      type: "testimonial",
      quote:
        "I've moved houses all my life, but no move has been smoother than this! My furniture was disassembled and reassembled with absolute care, and there was no delay in the transportation process.",
      author: "Nona L.",
    },
  ],
  "long-distance-moving": [
    { type: "h2", text: SERVICE_TAGLINE },
    {
      type: "p",
      text: "Long-distance moves are a major event in people's lives. Moving from one state to the other is usually known as a long-distance or interstate move. The process can be extremely stressful since you have to pack your items, load them up, and then travel to a whole new state. With the help of professional movers at Dependable Movers, you can enjoy the process instead of dread it!",
    },
    { type: "h2", text: "We use top-notch packing materials and tools" },
    {
      type: "p",
      text: "Long-distance moves can be a bit different from local moves because of the larger distance. However, you don't have to worry about any hidden costs with Dependable Movers—our competitive prices are based on the distance and size of the move, and our agents will guide you through the whole process so that you know exactly what's going on.",
    },
    {
      type: "p",
      text: "Dependable Movers is one of the most reliable and trustworthy moving companies across the USA. With more than five decades of combined moving experience, you can be confident in our skills and knowledge regarding long-distance moves.",
    },
    {
      type: "p",
      text: "Your satisfaction and peace of mind are our top priorities—that's why we ensure that all our moving solutions are completely personalized according to your requirements. Our high-quality equipment ensures that all your belongings are packed, transported, and unpacked without any delays or issues.",
    },
    {
      type: "p",
      text: "From planning and packing to loading and unloading, we're there to support you. Dependable Movers reliable service will make sure that your furniture arrives right on schedule.",
    },
    {
      type: "p",
      text: "If you're ready to begin your long-distance move, fill out our contact form to get a free quote. We'll handle your interstate move from beginning to end!",
    },
    { type: "p", text: "Get in touch with us to find out more." },
    {
      type: "testimonial",
      quote: "Perfect experience from start to finish. Everything arrived on schedule.",
      author: "Kevin M.",
    },
  ],
  "commercial-moving": [
    { type: "h2", text: SERVICE_TAGLINE },
    {
      type: "p",
      text: "A commercial move consists of the complete relocation of medical centers, restaurants, offices, and more. Moving commercial items is completely different from moving houses since it requires highly trained professionals to handle huge machines and equipment. Businesses and companies can't take a long break from their global connections, so it's important to set up the new office space as soon as possible.",
    },
    {
      type: "p",
      text: "Our office move includes:",
    },
    {
      type: "ul",
      items: [
        "Disassembling and reassembling furniture and equipment",
        "Packing and unpacking files and documents",
        "Loading and unloading items",
        "Specialized handling and packing of electronics",
      ],
    },
    { type: "h2", text: "Dependable Movers is ready to go the distance!" },
    {
      type: "p",
      text: "Few business owners are lucky enough to move to a new office down the hall. A local relocation is complicated, but long-distance relocation can be even more difficult. As a company that prioritizes our customer's satisfaction and happiness above all else, we aim to use our 50 years of combined experience to help you and your employees make a smooth, stress-free move across long and short distances.",
    },
    {
      type: "p",
      text: "Our company is very flexible when it comes to catering to your moving needs—whether you need last-minute moving services or have a strict timetable that you need to follow, we've got your back. We strive to exceed all your expectations and go above and beyond to provide you with the ultimate moving experience. You and your company deserve only the best!",
    },
    {
      type: "p",
      text: "Our professional team will create a streamlined plan while keeping a close eye on different aspects of your move. If we notice any problems, we'll be sure to solve them in a timely manner. Dependable Movers has reliable and professional movers with the right skills and knowledge to pack and move all your machines, IT equipment, and cubicles.",
    },
    {
      type: "p",
      text: "If you're interested in getting the finest moving services for your business, fill out the form to get a free quote from our agents! They'll explain the whole moving process in detail so that you know exactly what to expect when it's time to start packing.",
    },
    { type: "p", text: "Get in touch with us to find out more!" },
    {
      type: "testimonial",
      quote: "Loved working with them — our office was up and running faster than we expected.",
      author: "Kate M.",
    },
  ],
  "furniture-moving": [
    { type: "h2", text: SERVICE_TAGLINE },
    {
      type: "p",
      text: "We all have a few pieces of furniture that we hold near and dear to our hearts. When moving to another house across the city or country, you'll want to take those items with you.",
    },
    {
      type: "p",
      text: "At Dependable Movers, our trained professionals will pack and move your belongings with care. We handle all types of furniture, from large beds and dining tables to small corner tables and chairs, with the care it deserves. If you want a seamless move without any damage done to the furniture, hire our professional movers to handle your furniture today!",
    },
    { type: "h2", text: "Dependable Movers has professional and skilled movers" },
    {
      type: "p",
      text: "Our company prides itself on its professionalism, transparency, and attention to detail. Our skilled moving crew has more than 50 years of combined experience in packing, handling, and transporting different types of furniture, ranging from delicate and fragile pieces to large and heavy items.",
    },
    {
      type: "p",
      text: "We use only the best packing material to ensure that your items arrive unharmed at your new home. We've got the right tools to help disassemble and reassemble your furniture without causing any damage.",
    },
    {
      type: "p",
      text: "We understand how stressful this process can be—moving houses along with all your furniture can be a grueling process. Luckily, Dependable Movers is here to help you out!",
    },
    {
      type: "p",
      text: "Our agents will create a personalized moving plan for you according to your specifications and talk you through the process in case you have any questions. Save yourself from stress and potential injuries; just let us handle everything!",
    },
    { type: "p", text: "Get in touch with us to find out more!" },
    {
      type: "testimonial",
      quote:
        "Every piece of vintage furniture arrived without a scratch. Couldn't be happier.",
      author: "Laura P.",
    },
  ],
  "piano-moving": [
    { type: "h2", text: SERVICE_TAGLINE },
    {
      type: "p",
      text: "Most people attempt to move their furniture with the help of their friends and family; however, moving a piano by yourself is not as straightforward as you might think. The average piano weighs around 300–500 pounds, meaning you need the right tools and equipment to do it properly.",
    },
    {
      type: "p",
      text: "At Dependable Movers, our professional moving team is fully equipped with the highest quality tools to help you! We've got everything from well-maintained trucks to sliders and other necessary moving supplies. We'll keep your precious piano safe and unharmed.",
    },
    { type: "h2", text: "We'll handle your piano with care" },
    {
      type: "p",
      text: "While pianos are large and heavy, they're also rather delicate. They need to be handled with care so that there's no damage caused to the keys and strings. Pianos have a rather awkward shape—you need to measure the doorways, hallways, and staircases of all the places through which your piano will get transported. Additionally, since pianos sometimes need to be slid across the floor, there's always a chance that you might damage your property while moving a piano. Pro movers at Dependable Movers can deal with all these problems!",
    },
    {
      type: "p",
      text: "Stay safe and conserve energy while our movers do all the packing and heavy lifting! We don't want our customers to get unnecessary muscle spasms or strains if we can help it. We have highly trained movers who know how to lift, carry, and transport pianos safely. Our goal is to help you relocate your piano in a smooth, professional, and timely manner.",
    },
    {
      type: "p",
      text: "Save your time, energy, and effort, and request a quote for moving your piano today!",
    },
    { type: "p", text: "Get in touch with us to find out more." },
    {
      type: "testimonial",
      quote: "Their team is really compassionate and treated our piano like their own.",
      author: "Marco S.",
    },
  ],
  "last-second-moves": [
    { type: "h2", text: SERVICE_TAGLINE },
    {
      type: "p",
      text: "Did you get a last-minute notice to move out of your house or workplace? Moving is stressful enough as it is—with the extra time constraints, it feels borderline impossible to manage by yourself. But don't worry, experienced movers from Dependable Movers have got your back!",
    },
    {
      type: "p",
      text: "Our licensed movers are committed to making sure that your move is stress-free, smooth, and efficient. Our last-second moving services include a wide variety of services, including packing, unpacking, loading, unloading, and transportation.",
    },
    { type: "h2", text: "Dependable Movers specializes in local and long-distance moves" },
    {
      type: "p",
      text: "Whether your new house or business is across the street or the state, we've got you covered. Our top-notch moving trucks will ensure that all your items reach your new destination without damage or time delays. Dependable Movers has experienced drivers who have in-depth knowledge of the area and can choose the best routes to ensure your moving process is smooth and uncomplicated.",
    },
    {
      type: "p",
      text: "You don't have to worry about any hidden costs when it comes to our last-second moving services! Our professional agents will work with you to create a personalized plan of action and provide an exact quote for the overall price, depending on the size and distance of the move. We'll be happy to answer any additional queries and walk you through the process!",
    },
    {
      type: "p",
      text: "Sometimes, you just don't have the time to deal with all your items when moving on such short notice. If you need to declutter your new home or keep your stuff stored away safely as you remodel your house, we can help coordinate storage solutions. We aim to provide a complete relocation solution that exceeds expectations and helps us build a long-lasting relationship with our customers.",
    },
    { type: "p", text: "Get in touch with us to find out more!" },
    {
      type: "testimonial",
      quote: "Never seen a more efficient team — they saved us when we had almost no notice.",
      author: "Luka K.",
    },
  ],
};
