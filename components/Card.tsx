import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, buttonText }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`} data-umami-event={`Clicked ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="h-112 object-cover object-center"
              width={630}
              height={500}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="h-112 object-cover object-center"
            width={630}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`} data-umami-event={`Clicked ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none  whitespace-pre-wrap text-gray-500 dark:text-gray-400">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
            data-umami-event={`Clicked ${title}`}
          >
            {buttonText ?? 'Learn more'} &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
