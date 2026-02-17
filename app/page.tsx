"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SOCIETIES = [
  "Anukampa Skylounges",
  "Anukampa Platina",
  "D'Terrace Vue",
  "Cedar Luxuria",
  "Dhanuka",
  "Other",
];

export default function HomePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [society, setSociety] = useState(SOCIETIES[0]);
  const [block, setBlock] = useState("");
  const [flat, setFlat] = useState("");

  const handleStart = () => {
    if (!name.trim()) return alert("Enter your name 😄");
    if (phone.trim().length < 10) return alert("Enter valid phone number 📞");
    if (!block.trim()) return alert("Enter Block / Tower 😄");
    if (!flat.trim()) return alert("Enter Flat Number 😄");

    localStorage.setItem("bhaiyu_name", name.trim());
    localStorage.setItem("bhaiyu_phone", phone.trim());
    localStorage.setItem("bhaiyu_society", society);
    localStorage.setItem("bhaiyu_block", block.trim());
    localStorage.setItem("bhaiyu_flat", flat.trim());

    router.push("/order");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-yellow-100 to-orange-200">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url('/images/tbk_homepage_background.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Holi blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-floatSlow absolute top-10 left-10 w-72 h-72 rounded-full bg-pink-500/40 blur-3xl"></div>
        <div className="animate-floatFast absolute top-40 right-10 w-80 h-80 rounded-full bg-orange-500/40 blur-3xl"></div>
        <div className="animate-floatSlow absolute bottom-10 left-20 w-96 h-96 rounded-full bg-yellow-400/40 blur-3xl"></div>
        <div className="animate-floatFast absolute bottom-20 right-32 w-72 h-72 rounded-full bg-purple-500/40 blur-3xl"></div>
        <div className="animate-floatSlow absolute top-64 left-1/2 w-96 h-96 rounded-full bg-green-400/30 blur-3xl"></div>
      </div>

      {/* Icons */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-16 left-10 text-7xl">🎨</div>
        <div className="absolute top-24 right-10 text-7xl">🔫</div>
        <div className="absolute bottom-24 left-16 text-7xl">🎈</div>
        <div className="absolute bottom-12 right-10 text-7xl">🌸</div>
        <div className="absolute top-1/2 left-12 text-7xl">🪣</div>
      </div>

      <style jsx global>{`
        @keyframes floatSlow {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-50px) translateX(30px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        @keyframes floatFast {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-70px) translateX(-40px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animate-floatFast {
          animation: floatFast 6s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white/85 backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-6 md:p-10">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-extrabold text-orange-800">
              The Bhaiyu&apos;s Kitchen Holi Specials 🕴️
            </h1>

            <p className="mt-2 text-sm md:text-base text-gray-800 font-bold">
              🌸 Exclusive Holi Menu | Pre-orders Only
            </p>

            <div className="mt-4 bg-gradient-to-r from-pink-200 via-yellow-200 to-orange-200 rounded-3xl p-4 border border-orange-200">
              <p className="text-sm md:text-base font-extrabold text-gray-900">
                📅 Delivery Date: 4th March (Holi)
              </p>
              <p className="text-xs md:text-sm font-semibold text-gray-800 mt-1">
                Order once, relax all day. Food will be delivered fresh & hot 😎🔥
              </p>
            </div>

            <div className="mt-6 bg-white rounded-3xl p-5 border border-gray-200">
              <p className="text-sm md:text-base text-gray-900 leading-relaxed font-semibold">
                Holi ka plan hai? Friends aa rahe hain?
                <br />
                Snacks chahiye gulal ke beech, lunch ke baad energy boost,
                aur raat ko full dinner.
                <br />
                <span className="font-extrabold text-pink-600">
                  Bar bar order ka stress khatam.
                </span>
                <br />
                Ab ek hi baar order karo aur delivery slots choose karo 😈🌈
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="p-4 rounded-3xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-gray-900 placeholder-gray-600"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="p-4 rounded-3xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-gray-900 placeholder-gray-600"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <select
              className="w-full p-4 rounded-3xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-extrabold text-gray-900 md:col-span-2"
              value={society}
              onChange={(e) => setSociety(e.target.value)}
            >
              {SOCIETIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <input
              className="p-4 rounded-3xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-gray-900 placeholder-gray-600"
              placeholder="Block / Tower"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
            />

            <input
              className="p-4 rounded-3xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-gray-900 placeholder-gray-600"
              placeholder="Flat Number"
              value={flat}
              onChange={(e) => setFlat(e.target.value)}
            />
          </div>

          <button
            onClick={handleStart}
            className="mt-8 w-full bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 hover:scale-[1.01] transition text-white font-extrabold py-5 rounded-3xl shadow-xl text-lg"
          >
            🚀 Start Holi Ordering
          </button>

          <div className="mt-6 text-center text-orange-800 font-extrabold">
            The Bhaiyu&apos;s Kitchen 🕴️
          </div>
        </div>
      </div>
    </div>
  );
}
