import Image from 'next/future/image';
import { useEffect, useState } from 'react';
import { WorkSample } from '../../../types/WorkSample';

interface Props {
  mediaDetails: WorkSample;
  setMediaDetails: (val: WorkSample | null) => void;
}

export default function FloatingMediaDetails({
  mediaDetails,
  setMediaDetails,
}: Props) {
  const [ratio, setRatio] = useState(16 / 9);

  // disable background scrolling when the details overlay is visible
  useEffect(() => {
    const oldOverflowStyle = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return function addScrollBack() {
      document.documentElement.style.overflow = oldOverflowStyle;
    };
  }, []);

  return (
    <div
      className="fixed w-full h-full bg-black bg-opacity-90 z-10"
      onClick={() => setMediaDetails(null)}
    >
      <div className="fixed top-0 left-2 text-white text-xl md:text-3xl mt-2 ml-2 text-center duration-300 transition-colors hover:text-red-400 cursor-pointer select-none">
        ✕
      </div>
      <div className="flex h-full left-0 right-0 top-0 bottom-0 m-auto z-20 space-x-5 p-10 justify-center items-center">
        <Image
          src={mediaDetails.source}
          alt="Loading"
          height={500}
          width={500 * ratio}
          quality={100}
          className="object-contain md2:m-5 w-1/2 select-none"
          onClick={(event) => event.stopPropagation()}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
          placeholder={'blur'}
          blurDataURL={mediaDetails.source}
        ></Image>

        <div
          className="hidden xs:block max-h-[90vh] w-1/2 rounded-sm p-1 sm:p-5 text-white break-word text-sm md:text-2xl overflow-auto space-y-10 transparent-scrollbar"
          onClick={(event) => event.stopPropagation()}
        >
          <h1 className="font-bold">{mediaDetails.title}</h1>
          <h2>
            {mediaDetails.description}Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Quisque volutpat, dolor vitae pellentesque
            volutpat, dolor mi iaculis diam, sit amet maximus est magna nec
            augue. Sed sit amet rutrum tellus. Praesent vitae nisi pellentesque,
            tristique nisi eget, auctor quam. Pellentesque semper sollicitudin
            enim, in dapibus erat bibendum vel. In placerat, ligula vel blandit
            accumsan, elit nunc mattis nulla, nec volutpat mauris enim ut quam.
            Proin sodales sagittis est vel rhoncus. Mauris in interdum quam.
            Etiam malesuada posuere mi eget finibus. Quisque sollicitudin
            volutpat nunc, sed auctor felis sagittis eu. Sed id orci varius
            ligula convallis tincidunt. Vivamus sagittis tortor neque, vitae
            laoreet ex suscipit quis. Suspendisse varius eleifend tellus at
            aliquam. Maecenas convallis odio et nisi blandit fringilla. Nunc
            ullamcorper quam non nisi posuere, ac pharetra arcu lobortis. Aenean
            porttitor tortor tellus, in feugiat ante faucibus id. Praesent
            pharetra eros ac ultrices auctor. Maecenas interdum sapien in leo
            rhoncus fringilla. Aliquam scelerisque metus pellentesque libero
            pellentesque, non tincidunt lacus mollis. Curabitur cursus, nulla id
            maximus convallis, erat dui hendrerit neque, eu interdum enim turpis
            a turpis. Nulla tincidunt nunc elit, nec posuere eros dignissim in.
            Vivamus vel tempor libero, id tincidunt erat. Nulla facilisi.
            Maecenas malesuada enim non justo cursus, eget auctor velit pretium.
            Vivamus non justo odio. Vestibulum tempus arcu at odio posuere,
            vitae faucibus tellus ornare. In interdum auctor arcu. Aenean et
            blandit diam. Phasellus non diam ut tortor placerat tincidunt non et
            magna. Donec id quam sit amet nisl placerat efficitur. Aenean
            malesuada non magna non facilisis. Vestibulum quis sagittis lacus,
            in dapibus turpis. Donec facilisis laoreet blandit. Nulla id sapien
            nulla. Praesent at lorem pellentesque leo consequat efficitur.
            Curabitur dictum neque nec ligula imperdiet maximus. Sed euismod
            lectus nec elit dignissim euismod. Cras eget porta risus. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Nulla malesuada tempor ullamcorper. Ut vel nisl diam.
            Pellentesque eu volutpat tortor. Aenean enim massa, accumsan vel
            tempus sit amet, consectetur non libero. Curabitur eget justo
            elementum, viverra libero porta, consequat leo. Pellentesque
            eleifend congue nisl, eget tincidunt nulla dapibus non. Integer et
            luctus ante. Suspendisse congue congue tincidunt. Nunc molestie
            imperdiet augue, ut pulvinar purus venenatis nec. Fusce varius
            porttitor ultricies. Duis vehicula aliquam mollis. Quisque eget nisi
            nec eros feugiat aliquam. Vestibulum egestas neque non nisl posuere
            rutrum. Suspendisse potenti. Nam pellentesque augue in tempus
            interdum. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Pellentesque at pellentesque
            metus, dapibus fermentum lectus. Phasellus aliquam ipsum in massa
            iaculis, id suscipit dolor facilisis. Etiam tempor purus quis mollis
            fermentum. Mauris posuere sodales orci, ut consequat tellus
            pellentesque sit amet. Vivamus non eros eros. Integer ac nisi eros.
          </h2>
          <h3>{new Date(mediaDetails.uploadDate).toLocaleDateString()}</h3>
        </div>
      </div>
    </div>
  );
}
