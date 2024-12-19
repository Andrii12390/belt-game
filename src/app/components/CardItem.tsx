import Image from "next/image"

interface CardItemProps {
  path?: string
}

export const CardItem = ({ path }: CardItemProps) => {
  return (
    <div className="flex items-center justify-center">
      {path ? (
        <Image src={path} height={95} width={65} alt="card" />
      )
    :
    <div className="flex h-[95px] w-[65px] border-2 border-yellow-600 border-dashed rounded-md text-yellow-600 font-bold justify-center items-center">
      Card
    </div>
    }
    </div>
  )
}
