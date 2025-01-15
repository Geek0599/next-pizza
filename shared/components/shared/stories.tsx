'use client';
import { cn, widthScroll } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import React, { useEffect, useRef, useState } from 'react';
import { Container } from './container';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories'
import { useClickAway } from 'react-use';

interface Props {
	className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = useState<IStory[]>([]);
	const [open, setOpen] = useState(false)
	const [selectedStories, setSelectedStories] = useState<IStory>()
	const ref = useRef(null)

	useEffect(()=>{
		async function fetchStories() {
			const data = await Api.stories.getAll()
			setStories(data)
		}
		fetchStories()
	},[])

	const onClickStory = (story: IStory) => {
		setSelectedStories(story)

		if(story.items.length > 0){
			setOpen(true)
			document.body.setAttribute('data-scroll-locked','')
			document.body.style.marginRight = widthScroll() + 'px'
			
		}
	}
	const onClose = () => {
		setOpen(false)
		document.body.style.removeProperty('margin-right')
		document.body.removeAttribute('data-scroll-locked')
	}

	useClickAway(ref, ()=>{
		onClose()
	})

	return (
		<>
			<Container className={cn('lg:gap-4 my-5 pb-2 max-[768px]:px-0 overflow-hidden', className)}>
				<div className="flex items-center sm:-mx-2 -mx-1 overflow-x-auto -mb-3 pb-3 max-[768px]:px-3">
					{stories.length === 0 && (
						[...Array(6)].map((_,index)=> (
							<div key={index} className="sm:px-2 px-1 flex-1 flex-grow-0 lg:basis-[16.6666%] md:basis-[23%] min-[480px]:basis-[31.333%] shrink-0 basis-[45%]">
								<div className="bg-gray-200 rounded-md animate-pulse sm:px-2 px-1 lg:pb-[129%] md:pb-[125%] pb-[140%]" />
							</div>
						))
					)}
					{stories.map((story)=> (
						<div key={story.id} className="sm:px-2 px-1 flex-1 flex-grow-0 lg:basis-[16.6666%] md:basis-[23%] min-[480px]:basis-[31.333%] shrink-0 basis-[45%]">
							<div onClick={()=>onClickStory(story)} className='overflow-hidden lg:pb-[129%] md:pb-[125%] pb-[140%] rounded-sm cursor-pointer relative bg-secondary shadow-md'>
								<img 
									src={story.previewImageUrl} 
									height={250}
									width={200}
									className='object-cover absolute top-0 left-0 w-full h-full'
									alt="preview stories" 
								/>
								<div className='absolute bottom-2 sm:left-2 left-1 font-bold text-lg p-1 rounded-sm bg-secondary shadow-sm'>{story.name}</div>
							</div>
						</div>
					))}

					{
						open && (
							<div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
								<div ref={ref} className="relative max-w-[450px] overflow-y-auto max-h-screen p-3 pt-10">
									<button onClick={onClose} className="absolute right-0 top-0 z-30">
										<X className='absolute top-0 right-0 w-8 h-8 text-white/50'/>
									</button>

									<ReactStories 
										onAllStoriesEnd={onClose}
										stories={selectedStories?.items.map((item)=> ({url: item.sourceUrl})) || []}
										defaultInterval={5000}
										width='100%'
										height='750px'
									/>
								</div>
							</div>
						)
					}
				</div>
			</Container>
		</>
	);
}