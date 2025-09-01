

const NewChat = () => {
  return (
   <svg
                className="w-5 h-5 text-[#6f47c7] group-hover:text-[#5a3a9f] 
               transition-colors duration-300 ease-in-out"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="19"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
  )
}

export default NewChat