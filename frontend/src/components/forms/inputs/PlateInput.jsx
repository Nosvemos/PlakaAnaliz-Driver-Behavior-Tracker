const PlateInput = ({value, onChange, disabled}) => {
  return (
    <div className="flex justify-center">
      <div className="flex max-w-full md:w-3/5 h-24 md:h-32 border-2 border-neutral rounded-xl overflow-hidden bg-white">
        <div className="relative bg-blue-900 w-12 md:w-16 h-full">
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white font-semibold leading-10 text-xl md:text-3xl tracking-[1.5px]">TR</span>
        </div>

        <input
          type="text"
          placeholder="34 ABC 123"
          className="flex-1 text-center w-full md:w-64 text-4xl md:text-6xl font-mono text-black tracking-[1.5px] focus:outline-none"
          maxLength="10"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default PlateInput