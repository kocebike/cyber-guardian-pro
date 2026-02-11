import { AspectRatio } from '@/components/ui/aspect-ratio';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
}

interface LearnMediaBlockProps {
  media: MediaItem[];
}

const LearnMediaBlock = ({ media }: LearnMediaBlockProps) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="space-y-4 my-6">
      {media.map((item, index) => (
        <div key={index} className="rounded-lg overflow-hidden border border-border">
          {item.type === 'image' ? (
            <AspectRatio ratio={16 / 9}>
              <img
                src={item.src}
                alt={item.alt || ''}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </AspectRatio>
          ) : (
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={item.src}
                title={item.alt || 'Video'}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          )}
          {item.caption && (
            <p className="text-sm text-muted-foreground p-3 bg-muted/30 text-center">
              {item.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearnMediaBlock;
