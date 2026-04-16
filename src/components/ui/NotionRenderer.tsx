import Image from 'next/image';
import type { NotionBlock } from '@/types/blog';

interface NotionRendererProps {
  blocks: NotionBlock[];
}

function renderRichText(richText: Array<{
  plain_text: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
  };
  href?: string | null;
}>): React.ReactNode[] {
  return richText.map((text, i) => {
    let content: React.ReactNode = text.plain_text;
    const ann = text.annotations;

    if (ann?.bold) content = <strong key={`b-${i}`}>{content}</strong>;
    if (ann?.italic) content = <em key={`i-${i}`}>{content}</em>;
    if (ann?.strikethrough) content = <s key={`s-${i}`}>{content}</s>;
    if (ann?.underline) content = <u key={`u-${i}`}>{content}</u>;
    if (ann?.code)
      content = (
        <code
          key={`c-${i}`}
          className="bg-[var(--bg-elevated)] text-[var(--primary-blue)] px-1.5 py-0.5 rounded text-sm font-mono"
        >
          {content}
        </code>
      );
    if (text.href)
      content = (
        <a
          key={`a-${i}`}
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--primary-blue)] underline underline-offset-2 hover:text-[var(--primary-blue-dark)]"
        >
          {content}
        </a>
      );

    return <span key={i}>{content}</span>;
  });
}

function renderBlock(block: NotionBlock): React.ReactNode {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      if (!value?.rich_text?.length) return <div key={id} className="h-4" />;
      return (
        <p key={id} className="text-[var(--text-body)] leading-relaxed mb-4">
          {renderRichText(value.rich_text)}
        </p>
      );

    case 'heading_1':
      return (
        <h2
          key={id}
          className="text-3xl font-extrabold uppercase text-[var(--text-primary)] mt-10 mb-4"
        >
          {renderRichText(value.rich_text)}
        </h2>
      );

    case 'heading_2':
      return (
        <h3
          key={id}
          className="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-3"
        >
          {renderRichText(value.rich_text)}
        </h3>
      );

    case 'heading_3':
      return (
        <h4
          key={id}
          className="text-xl font-bold text-[var(--text-primary)] mt-6 mb-2"
        >
          {renderRichText(value.rich_text)}
        </h4>
      );

    case 'bulleted_list_item':
      return (
        <li
          key={id}
          className="text-[var(--text-body)] leading-relaxed ml-6 list-disc mb-1"
        >
          {renderRichText(value.rich_text)}
        </li>
      );

    case 'numbered_list_item':
      return (
        <li
          key={id}
          className="text-[var(--text-body)] leading-relaxed ml-6 list-decimal mb-1"
        >
          {renderRichText(value.rich_text)}
        </li>
      );

    case 'quote':
      return (
        <blockquote
          key={id}
          className="border-l-4 border-[var(--primary-blue)] pl-6 my-6 italic text-[var(--text-secondary)]"
        >
          {renderRichText(value.rich_text)}
        </blockquote>
      );

    case 'callout':
      return (
        <div
          key={id}
          className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 my-4 flex gap-3"
        >
          {value.icon?.emoji && (
            <span className="text-xl flex-shrink-0">{value.icon.emoji}</span>
          )}
          <div className="text-[var(--text-body)] text-sm leading-relaxed">
            {renderRichText(value.rich_text)}
          </div>
        </div>
      );

    case 'code':
      return (
        <pre
          key={id}
          className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl p-4 my-4 overflow-x-auto"
        >
          <code className="text-sm font-mono text-[var(--text-primary)]">
            {value.rich_text?.map((t: { plain_text: string }) => t.plain_text).join('')}
          </code>
        </pre>
      );

    case 'image': {
      const src =
        value.type === 'file'
          ? value.file?.url
          : value.external?.url;
      const caption = value.caption?.map((c: { plain_text: string }) => c.plain_text).join('');
      if (!src) return null;
      return (
        <figure key={id} className="my-6">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src={src}
              alt={caption || 'Image de l\'article'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-[var(--text-muted)] mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'divider':
      return (
        <hr
          key={id}
          className="my-8 border-[var(--border-default)]"
        />
      );

    case 'toggle':
      return (
        <details
          key={id}
          className="my-4 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl overflow-hidden"
        >
          <summary className="px-4 py-3 cursor-pointer font-bold text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]">
            {renderRichText(value.rich_text)}
          </summary>
          <div className="px-4 pb-3">
            {value.children?.map((child: NotionBlock) => renderBlock(child))}
          </div>
        </details>
      );

    default:
      return null;
  }
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  return (
    <div className="prose-boumrank max-w-none">
      {blocks.map((block) => renderBlock(block))}
    </div>
  );
}
