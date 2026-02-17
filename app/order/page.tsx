"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  img: string;
  category: string;
  subCategory: string;
  price: number;
  isCurry?: boolean;
  isEggItem?: boolean;
};

const MENU: MenuItem[] = [
  // --- Chinese Starters
  {
    id: "chilli_chicken",
    name: "Chilli Chicken (Boneless)",
    desc: "Spicy Chinese style chicken with Holi punch 🔥",
    img: "https://via.placeholder.com/700x450.png?text=Chilli+Chicken",
    category: "Starters",
    subCategory: "Chinese Starters",
    price: 179,
  },
  {
    id: "chicken_pakoda",
    name: "Chicken Pakoda (Boneless)",
    desc: "Crispy pakoda perfect for Holi munching 🤤",
    img: "https://via.placeholder.com/700x450.png?text=Chicken+Pakoda",
    category: "Starters",
    subCategory: "Chinese Starters",
    price: 159,
  },

  // --- Indian Starters
  {
    id: "tandoori_chicken",
    name: "Tandoori Chicken",
    desc: "Smoky juicy tandoori flavour 😍",
    img: "https://via.placeholder.com/700x450.png?text=Tandoori+Chicken",
    category: "Starters",
    subCategory: "Indian Starters",
    price: 299,
  },

  // --- Momos
  {
    id: "steam_momos_5",
    name: "Chicken Steam Momos (5 pcs)",
    desc: "Reddish spicy momos with chutney 🥟🔥",
    img: "https://via.placeholder.com/700x450.png?text=Steam+Momos+5pcs",
    category: "Momos",
    subCategory: "Chicken Steam Momos",
    price: 79,
  },
  {
    id: "steam_momos_10",
    name: "Chicken Steam Momos (10 pcs)",
    desc: "Big plate of steam momos for Holi party 😈",
    img: "https://via.placeholder.com/700x450.png?text=Steam+Momos+10pcs",
    category: "Momos",
    subCategory: "Chicken Steam Momos",
    price: 149,
  },
  {
    id: "fried_momos_5",
    name: "Chicken Fried Momos (5 pcs)",
    desc: "Crispy reddish fried momos 🤤🔥",
    img: "https://via.placeholder.com/700x450.png?text=Fried+Momos+5pcs",
    category: "Momos",
    subCategory: "Chicken Fried Momos",
    price: 89,
  },
  {
    id: "fried_momos_10",
    name: "Chicken Fried Momos (10 pcs)",
    desc: "Full plate crispy fried momos 😈🥟",
    img: "https://via.placeholder.com/700x450.png?text=Fried+Momos+10pcs",
    category: "Momos",
    subCategory: "Chicken Fried Momos",
    price: 169,
  },

  // --- Main Course: Chicken Chukan
  {
    id: "chicken_3pcs",
    name: "Chicken Curry (3 Piece)",
    desc: "Perfect mini curry for 1-2 people 🍗",
    img: "https://via.placeholder.com/700x450.png?text=Chicken+3pcs",
    category: "Main Course",
    subCategory: "Chicken Chukan",
    price: 199,
    isCurry: true,
  },
  {
    id: "chicken_500",
    name: "Chicken Curry (500 Gms)",
    desc: "Family portion chicken curry ❤️",
    img: "https://via.placeholder.com/700x450.png?text=Chicken+500gm",
    category: "Main Course",
    subCategory: "Chicken Chukan",
    price: 349,
    isCurry: true,
  },
  {
    id: "chicken_1kg",
    name: "Chicken Curry (1 KG)",
    desc: "Big Holi party pack chicken curry 🔥",
    img: "https://via.placeholder.com/700x450.png?text=Chicken+1KG",
    category: "Main Course",
    subCategory: "Chicken Chukan",
    price: 649,
    isCurry: true,
  },

  // --- Main Course: MuttonChi
  {
    id: "mutton_500",
    name: "Mutton Curry (500 Gm)",
    desc: "Slow cooked mutton curry 💣🔥",
    img: "https://via.placeholder.com/700x450.png?text=Mutton+500gm",
    category: "Main Course",
    subCategory: "MuttonChi",
    price: 749,
    isCurry: true,
  },
  {
    id: "mutton_1kg",
    name: "Mutton Curry (1 KG)",
    desc: "Full party mutton pack 😈",
    img: "https://via.placeholder.com/700x450.png?text=Mutton+1KG",
    category: "Main Course",
    subCategory: "MuttonChi",
    price: 1449,
    isCurry: true,
  },

  // --- Main Course: Eggsclusive
  {
    id: "egg_3pcs",
    name: "Egg Curry (3 Piece)",
    desc: "Budget egg curry with spicy gravy 🥚🔥",
    img: "https://via.placeholder.com/700x450.png?text=Egg+3pcs",
    category: "Main Course",
    subCategory: "Eggsclusive",
    price: 109,
    isCurry: true,
    isEggItem: true,
  },
  {
    id: "egg_6pcs",
    name: "Egg Curry (6 Piece)",
    desc: "Egg curry for true egg lovers 😍🥚",
    img: "https://via.placeholder.com/700x450.png?text=Egg+6pcs",
    category: "Main Course",
    subCategory: "Eggsclusive",
    price: 209,
    isCurry: true,
    isEggItem: true,
  },
];

export default function OrderPage() {
  const router = useRouter();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    society: "",
    block: "",
    flat: "",
  });

  const [qty, setQty] = useState<Record<string, number>>({});
  const [lessSpicy, setLessSpicy] = useState<Record<string, boolean>>({});
  const [eggGravy, setEggGravy] = useState<Record<string, boolean>>({});

  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"single" | "slots">("single");

  const [slots, setSlots] = useState<
    { time: string; allocations: Record<string, number> }[]
  >([{ time: "", allocations: {} }]);

  // My Holi Package form
  const [peopleCount, setPeopleCount] = useState("");
  const [packageType, setPackageType] = useState<"Starters+Lunch" | "Starters+Dinner">(
    "Starters+Lunch"
  );

  useEffect(() => {
    const name = localStorage.getItem("bhaiyu_name") || "";
    const phone = localStorage.getItem("bhaiyu_phone") || "";
    const society = localStorage.getItem("bhaiyu_society") || "";
    const block = localStorage.getItem("bhaiyu_block") || "";
    const flat = localStorage.getItem("bhaiyu_flat") || "";

    if (!name || !phone || !society) {
      router.push("/");
      return;
    }

    setCustomer({ name, phone, society, block, flat });
  }, [router]);

  // Auto-save edited phone/society
  useEffect(() => {
    if (customer.phone) localStorage.setItem("bhaiyu_phone", customer.phone);
    if (customer.society) localStorage.setItem("bhaiyu_society", customer.society);
  }, [customer.phone, customer.society]);

  const grouped = useMemo(() => {
    const map: Record<string, Record<string, MenuItem[]>> = {};
    for (const item of MENU) {
      if (!map[item.category]) map[item.category] = {};
      if (!map[item.category][item.subCategory]) map[item.category][item.subCategory] = [];
      map[item.category][item.subCategory].push(item);
    }
    return map;
  }, []);

  const changeQty = (id: string, change: number) => {
    setQty((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + change);
      return { ...prev, [id]: newQty };
    });
  };

  const selectedItems = useMemo(() => {
    return MENU.map((item) => {
      const q = qty[item.id] || 0;
      return {
        ...item,
        qty: q,
        total: q * item.price,
      };
    }).filter((x) => x.qty > 0);
  }, [qty]);

  const totalQty = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.qty, 0);
  }, [selectedItems]);

  const totalBill = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.total, 0);
  }, [selectedItems]);

  const gravyCharge = useMemo(() => {
    let charge = 0;
    for (const item of selectedItems) {
      if (item.isEggItem && eggGravy[item.id]) {
        charge += item.qty * 20;
      }
    }
    return charge;
  }, [selectedItems, eggGravy]);

  const grandTotal = totalBill + gravyCharge;

  const discountAmount = useMemo(() => {
    const isSkylounges = customer.society === "Anukampa Skylounges";
    if (isSkylounges) return Math.round(grandTotal * (grandTotal >= 2500 ? 0.2 : 0.1));
    return Math.round(grandTotal * (grandTotal >= 2500 ? 0.15 : 0.05));
  }, [grandTotal, customer.society]);

  const finalPayable = grandTotal - discountAmount;

  const eligibleForSlots = useMemo(() => {
    return grandTotal > 999 || totalQty >= 4;
  }, [grandTotal, totalQty]);

  const addSlot = () => {
    if (slots.length >= 3) return;
    setSlots((prev) => [...prev, { time: "", allocations: {} }]);
  };

  const updateSlotTime = (index: number, time: string) => {
    setSlots((prev) => {
      const updated = [...prev];
      updated[index].time = time;
      return updated;
    });
  };

  const updateSlotAllocation = (slotIndex: number, itemId: string, value: number) => {
    setSlots((prev) => {
      const updated = [...prev];
      updated[slotIndex].allocations[itemId] = Math.max(0, value);
      return updated;
    });
  };

  const validateSlots = () => {
    for (const item of selectedItems) {
      let allocated = 0;
      for (const slot of slots) {
        allocated += slot.allocations[item.id] || 0;
      }
      if (allocated > item.qty) {
        return `Slot allocation error: ${item.name} exceeds ordered qty`;
      }
    }

    for (const slot of slots) {
      if (!slot.time.trim()) {
        return "Please select time for all slots 🕒";
      }
    }

    return null;
  };

  const generateSlotsText = () => {
    let text = "";

    slots.forEach((slot, i) => {
      const slotItems: string[] = [];

      selectedItems.forEach((item) => {
        const q = slot.allocations[item.id] || 0;
        if (q > 0) {
          slotItems.push(`- ${item.name} x${q}`);
        }
      });

      if (slotItems.length > 0) {
        text += `\n🕒 Slot ${i + 1} (${slot.time}):\n${slotItems.join("\n")}\n`;
      }
    });

    return text.trim() || "No slot allocation provided.";
  };

  const handleOrderNow = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least 1 item 😄");
      return;
    }
    setShowDeliveryPopup(true);
  };

  const confirmAndSendOrder = () => {
    if (deliveryMode === "slots") {
      if (!eligibleForSlots) {
        alert("Custom slots available only if cart > ₹999 OR total quantity >= 4.");
        return;
      }

      const err = validateSlots();
      if (err) {
        alert(err);
        return;
      }
    }

    const itemsText = selectedItems
      .map((i) => {
        const spiceText = i.isCurry ? (lessSpicy[i.id] ? " (Less Spicy)" : " (Normal)") : "";
        const gravyText = i.isEggItem ? (eggGravy[i.id] ? " +Gravy" : "") : "";
        return `${i.name}${spiceText}${gravyText} x${i.qty} = ₹${i.total}`;
      })
      .join("\n");

    const slotText =
      deliveryMode === "slots"
        ? `\n📦 Delivery Slots:\n${generateSlotsText()}\n`
        : "\n📦 Delivery: All items together\n";

    const msg = `🎨🌸 HOLI PRE-ORDER 🌸🎨
📅 Delivery Date: 4th March

🏷️ The Bhaiyu's Kitchen 🕴️

👤 Customer: ${customer.name}
📞 Phone: ${customer.phone}
🏡 Society: ${customer.society}
🏢 Block: ${customer.block}
🏠 Flat: ${customer.flat}

🛒 Items:
${itemsText}

${slotText}

💰 Bill: ₹${totalBill}
🍛 Egg Gravy Charges: ₹${gravyCharge}
🧾 Total: ₹${grandTotal}

🎁 Discount: ₹${discountAmount}
✅ Final Payable: ₹${finalPayable}

Please confirm my order & share payment details.

The Bhaiyu's Kitchen 🕴️`;

    window.open(`https://wa.me/918852015567?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendMyHoliPackage = () => {
    if (!peopleCount.trim()) {
      alert("Enter number of people 😄");
      return;
    }

    const msg = `🌸 MY HOLI PACKAGE REQUEST 🌸
📅 Delivery Date: 4th March

🏷️ The Bhaiyu's Kitchen 🕴️

👤 Name: ${customer.name}
📞 Phone: ${customer.phone}
🏡 Society: ${customer.society}
🏢 Block: ${customer.block}
🏠 Flat: ${customer.flat}

👥 No. of People: ${peopleCount}
🍽️ Package Type: ${packageType}

Please suggest best Holi package & confirm order.

The Bhaiyu's Kitchen 🕴️`;

    window.open(`https://wa.me/918852015567?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-yellow-100 to-orange-200">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-3xl font-extrabold text-orange-800">
              The Bhaiyu&apos;s Kitchen Holi Specials 🕴️
            </h1>
            <p className="text-xs md:text-sm text-gray-800 font-bold">
              📅 Delivery Date: 4th March | Pre-orders Only
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="bg-gray-200 hover:bg-gray-300 font-extrabold px-4 py-2 rounded-2xl"
          >
            ⬅ Back
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Menu */}
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(grouped).map(([category, subs]) => (
            <div
              key={category}
              className="bg-white/85 backdrop-blur-md rounded-3xl shadow-lg p-5 border border-orange-200"
            >
              <h2 className="text-xl font-extrabold text-orange-700">{category}</h2>

              {Object.entries(subs).map(([sub, items]) => (
                <div key={sub} className="mt-6">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-3">{sub}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item) => {
                      const q = qty[item.id] || 0;

                      return (
                        <div
                          key={item.id}
                          className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                        >
                          <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />

                          <div className="p-4">
                            <p className="font-extrabold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-700 mt-1 font-semibold">{item.desc}</p>

                            <p className="text-sm font-extrabold text-orange-700 mt-2">
                              ₹{item.price}
                            </p>

                            {item.isCurry && (
                              <label className="flex items-center gap-2 mt-3 bg-orange-50 border border-orange-200 px-3 py-2 rounded-2xl cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={lessSpicy[item.id] || false}
                                  onChange={(e) =>
                                    setLessSpicy((prev) => ({
                                      ...prev,
                                      [item.id]: e.target.checked,
                                    }))
                                  }
                                />
                                <span className="text-sm font-extrabold text-gray-900">
                                  🌶️ Less Spicy
                                </span>
                              </label>
                            )}

                            {item.isEggItem && (
                              <label className="flex items-center gap-2 mt-3 bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-2xl cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={eggGravy[item.id] || false}
                                  onChange={(e) =>
                                    setEggGravy((prev) => ({
                                      ...prev,
                                      [item.id]: e.target.checked,
                                    }))
                                  }
                                />
                                <span className="text-sm font-extrabold text-gray-900">
                                  🍛 Nonveg Gravy (+₹20)
                                </span>
                              </label>
                            )}

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => changeQty(item.id, -1)}
                                  className="w-10 h-10 rounded-2xl bg-gray-100 border border-gray-300 font-extrabold text-lg hover:bg-gray-200"
                                >
                                  −
                                </button>

                                <div className="w-10 text-center font-extrabold text-gray-900">
                                  {q}
                                </div>

                                <button
                                  onClick={() => changeQty(item.id, 1)}
                                  className="w-10 h-10 rounded-2xl bg-orange-600 text-white font-extrabold text-lg hover:bg-orange-700"
                                >
                                  +
                                </button>
                              </div>

                              <div className="text-xs font-extrabold text-gray-800">
                                Total: ₹{q * item.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* YAARON KE SAATH */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-orange-200 shadow-xl p-6">
            <h2 className="text-2xl font-extrabold text-pink-600">
              🍻 Yaaron Ke Saath
            </h2>
            <p className="mt-2 text-sm font-semibold text-gray-800">
              Ready-made Holi party packages. Order once & chill 😎🌸
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 border border-orange-200 rounded-3xl p-5 shadow-md">
                <h3 className="text-lg font-extrabold text-gray-900">Package 1</h3>
                <p className="text-sm font-bold text-gray-700 mt-1">₹2499</p>
                <button
                  onClick={() =>
                    setQty({
                      chilli_chicken: 2,
                      chicken_pakoda: 2,
                      steam_momos_10: 2,
                      chicken_500: 2,
                      egg_6pcs: 1,
                    })
                  }
                  className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 rounded-3xl"
                >
                  Select Package 1
                </button>
              </div>

              <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 border border-orange-200 rounded-3xl p-5 shadow-md">
                <h3 className="text-lg font-extrabold text-gray-900">Package 2</h3>
                <p className="text-sm font-bold text-gray-700 mt-1">₹3499</p>
                <button
                  onClick={() =>
                    setQty({
                      chilli_chicken: 3,
                      chicken_pakoda: 3,
                      fried_momos_10: 3,
                      chicken_1kg: 1,
                      mutton_500: 1,
                      egg_6pcs: 2,
                    })
                  }
                  className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 rounded-3xl"
                >
                  Select Package 2
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-orange-200">
            <h2 className="text-lg font-extrabold text-gray-900">🧾 Checkout</h2>

            <div className="mt-4 space-y-2 text-sm text-gray-900 font-bold">
              <div className="flex justify-between">
                <span>Total Bill</span>
                <span>₹{totalBill}</span>
              </div>

              <div className="flex justify-between">
                <span>Egg Gravy Charges</span>
                <span>₹{gravyCharge}</span>
              </div>

              <div className="flex justify-between">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <div className="flex justify-between text-green-700">
                <span>Discount</span>
                <span>- ₹{discountAmount}</span>
              </div>

              <div className="border-t pt-3 flex justify-between text-base">
                <span className="font-extrabold">Final Payable</span>
                <span className="font-extrabold text-green-700">₹{finalPayable}</span>
              </div>

              <p className="text-xs text-gray-700 mt-2">
                📅 Delivery Date: <span className="font-extrabold">4th March</span>
              </p>
            </div>

            <button
              onClick={handleOrderNow}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 rounded-3xl text-lg shadow-lg"
            >
              📲 Order Now
            </button>

            <div className="mt-4 text-center font-extrabold text-orange-800">
              The Bhaiyu&apos;s Kitchen 🕴️
            </div>
          </div>

          {/* Editable Customer Info */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-5 border border-orange-200">
            <h2 className="text-lg font-extrabold text-gray-900">👤 Customer Info</h2>

            <div className="mt-4 space-y-3 text-sm font-extrabold text-gray-900">
              <p className="text-base font-extrabold text-orange-800">
                Name: {customer.name}
              </p>

              <div>
                <label className="text-xs font-extrabold text-gray-700">Phone Number</label>
                <input
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="mt-1 w-full p-3 rounded-2xl border border-gray-400 font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-gray-700">Society Name</label>
                <input
                  value={customer.society}
                  onChange={(e) =>
                    setCustomer((prev) => ({ ...prev, society: e.target.value }))
                  }
                  className="mt-1 w-full p-3 rounded-2xl border border-gray-400 font-bold text-gray-900"
                />
              </div>

              <p>Block: {customer.block}</p>
              <p>Flat: {customer.flat}</p>
            </div>
          </div>

          {/* My Holi Package Form */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-5 border border-orange-200">
            <h2 className="text-lg font-extrabold text-pink-600">🎁 My Holi Package</h2>
            <p className="text-xs text-gray-700 font-semibold mt-1">
              Not sure what to order? Just tell us your plan 😎
            </p>

            <input
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              placeholder="No. of People"
              className="mt-4 w-full p-3 rounded-2xl border border-gray-400 font-bold text-gray-900 placeholder-gray-600"
            />

            <select
              value={packageType}
              onChange={(e) =>
                setPackageType(e.target.value as "Starters+Lunch" | "Starters+Dinner")
              }
              className="mt-3 w-full p-3 rounded-2xl border border-gray-400 font-extrabold text-gray-900"
            >
              <option value="Starters+Lunch">Starters + Lunch</option>
              <option value="Starters+Dinner">Starters + Dinner</option>
            </select>

            <button
              onClick={sendMyHoliPackage}
              className="mt-4 w-full bg-gradient-to-r from-pink-600 to-orange-500 text-white font-extrabold py-3 rounded-3xl shadow-lg"
            >
              📲 Connect on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* DELIVERY POPUP */}
      {showDeliveryPopup && (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 border border-orange-200">
            <h2 className="text-xl font-extrabold text-orange-700">
              🚚 Choose Delivery Option
            </h2>

            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 bg-orange-50 border border-orange-200 p-4 rounded-3xl cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMode === "single"}
                  onChange={() => setDeliveryMode("single")}
                />
                <div>
                  <p className="font-extrabold text-gray-800">
                    All items delivered at same time
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-3xl cursor-pointer border ${
                  eligibleForSlots
                    ? "bg-pink-50 border-pink-200"
                    : "bg-gray-100 border-gray-200 opacity-60"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  disabled={!eligibleForSlots}
                  checked={deliveryMode === "slots"}
                  onChange={() => setDeliveryMode("slots")}
                />
                <div>
                  <p className="font-extrabold text-gray-800">
                    Customized delivery slots (up to 3)
                  </p>

                  {!eligibleForSlots && (
                    <p className="text-xs text-red-600 font-bold mt-1">
                      Available only if cart &gt; ₹999 OR total quantity &gt;= 4.
                    </p>
                  )}
                </div>
              </label>
            </div>

            {/* SLOT UI */}
            {deliveryMode === "slots" && eligibleForSlots && (
              <div className="mt-6">
                <h3 className="font-extrabold text-gray-800">
                  🕒 Select Slots & Allocate Items
                </h3>

                <div className="mt-4 space-y-4">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      className="border border-orange-200 rounded-3xl p-4 bg-orange-50"
                    >
                      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                        <p className="font-extrabold text-gray-800">
                          Slot {index + 1}
                        </p>

                        <input
                          type="time"
                          value={slot.time}
                          onChange={(e) => updateSlotTime(index, e.target.value)}
                          className="p-2 rounded-2xl border border-gray-300 font-bold"
                        />
                      </div>

                      <div className="mt-4 space-y-2">
                        {selectedItems.map((item) => {
                          const allocated = slot.allocations[item.id] || 0;

                          return (
                            <div
                              key={item.id}
                              className="flex justify-between items-center bg-white rounded-2xl p-3 border border-gray-200"
                            >
                              <div>
                                <p className="font-bold text-gray-800 text-sm">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Ordered: {item.qty}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  className="w-9 h-9 rounded-xl bg-gray-100 font-bold"
                                  onClick={() =>
                                    updateSlotAllocation(index, item.id, allocated - 1)
                                  }
                                >
                                  −
                                </button>

                                <div className="w-10 text-center font-extrabold">
                                  {allocated}
                                </div>

                                <button
                                  className="w-9 h-9 rounded-xl bg-orange-600 text-white font-bold"
                                  onClick={() =>
                                    updateSlotAllocation(index, item.id, allocated + 1)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {slots.length < 3 && (
                  <button
                    onClick={addSlot}
                    className="mt-4 w-full bg-gradient-to-r from-pink-600 to-orange-500 text-white font-extrabold py-3 rounded-3xl shadow-lg"
                  >
                    ➕ Add Another Slot
                  </button>
                )}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDeliveryPopup(false)}
                className="w-1/2 bg-gray-200 hover:bg-gray-300 font-extrabold py-3 rounded-3xl"
              >
                Back to Menu
              </button>

              <button
                onClick={confirmAndSendOrder}
                className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 rounded-3xl"
              >
                Confirm & Send WhatsApp
              </button>
            </div>

            <div className="mt-4 text-center text-xs text-gray-500 font-semibold">
              The Bhaiyu&apos;s Kitchen 🕴️
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
