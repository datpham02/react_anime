import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { getRecentAnime } from '~/utils/API'
import { RecentAnime } from '~/utils/interface'
import Loading from './Loading'

const RecentAnime = () => {
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['recent_anime'],
        queryFn: async () => {
            const data = await getRecentAnime(1, 20, 'zoro')

            return data
        },
    })

    return (
        <>
            <div className='flex flex-col space-y-4 px-[15px]'>
                <span className='text-[#2196F3] text-[20px] font-semibold'>
                    Recent Anime
                </span>
                <div className='grid 2xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4'>
                    {isLoading ? (
                        <div className='w-full h-full flex items-center justify-center'>
                            <Loading />
                        </div>
                    ) : (
                        data?.results?.map((recent_anime: RecentAnime) => {
                            return (
                                <div
                                    key={recent_anime.id}
                                    className='w-full h-full rounded-md cursor-pointer'
                                >
                                    <div className='h-[80%] relative flex items-center justify-center group'>
                                        <div className='after:anime-poster-bg'></div>
                                        <img
                                            className='w-full h-full object-cover'
                                            src={recent_anime.image}
                                        />
                                        <div className='z-[-2] group-hover:z-[1] flex transition-all duration-200 ease-linear absolute top-0 left-0 bottom-0 right-0 w-full h-full justify-center items-center bg-[rgba(0,0,0,0)] group-hover:bg-[rgba(0,0,0,0.4)]'>
                                            <BsFillPlayFill className='w-[50px] h-[50px] text-[#fff]' />
                                        </div>
                                    </div>
                                    <div className='h-[20%] flex flex-col space-y-1 bg-[#2a2c31] px-[8px] py-[10px]'>
                                        <span
                                            style={{
                                                color: recent_anime.color,
                                            }}
                                            className='text-[#fff] font-medium text-[14px] line-clamp-2'
                                        >
                                            {recent_anime.title.romaji}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </>
    )
}

export default RecentAnime
