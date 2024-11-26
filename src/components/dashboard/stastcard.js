import Image from "next/image";

export function StatsCard() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      {/* Card Container */}
      <div className="relative flex flex-row gap-3 justify-center flex-wrap items-center md:justify-arround w-full p-6 bg-white rounded-xl ">
        {/* Glowing Border */}
        <div
          className="absolute inset-0 -z-10 rounded-xl blur-md opacity-80"
          style={{
            background: "linear-gradient(135deg, #e0f7ff, #ffffff, #e0f7ff)",
            filter: "blur(15px)",
          }}
        ></div>

        {/* Earning Section */}
        <div className="flex min-w-[252px] justify-start w-1/4 flex-row items-center text-center gap-2">
          <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-r from-yellow-200 to-orange-300 flex items-center justify-center">
            <Image width={42} height={42} src="/earning.svg" alt="Earning Icon" />
          </div>
          <div className="flex flex-col text-start gap-1">
            <p className="text-sm font-medium text-gray-500">Earning</p>
            <h3 className="text-xl font-bold text-gray-800">Rp2.03mio</h3>
            <p className="text-sm text-red-500">↑ 37.8% this month</p>
          </div>
        </div>

        {/* Expenses Section */}
        <div className="flex min-w-[252px] justify-start w-1/4 flex-row items-center text-center gap-2">
          <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-r from-yellow-200 to-orange-300 flex items-center justify-center">
            <Image width={42} height={42} src="/expenses.svg" alt="Earning Icon" />
          </div>
          <div className="flex flex-col text-start gap-1">
            <p className="text-sm font-medium text-gray-500">Expenses</p>
            <h3 className="text-xl font-bold text-gray-800">Rp1.80mio</h3>
            <p className="text-sm text-green-500">↑ 11% this week</p>
          </div>
        </div>

        {/* Balance Section */}
        <div className="flex min-w-[252px] justify-start w-1/4 flex-row items-center text-center gap-2">
          <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-r from-yellow-200 to-orange-300 flex items-center justify-center">
            <Image width={42} height={42} src="/earning.svg" alt="Earning Icon" />
          </div>
          <div className="flex flex-col text-start gap-1">
            <p className="text-sm font-medium text-gray-500">Balance</p>
            <h3 className="text-xl font-bold text-gray-800">Rp397k</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
