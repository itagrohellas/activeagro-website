import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { cn } from '@/lib/utils';

interface ProductRichTextProps {
  data: SerializedEditorState | null | undefined;
  className?: string;
}

/**
 * ProductRichText — render Lexical rich-text content από το Payload.
 *
 * Παίρνει το JSON state του Lexical editor και το μετατρέπει σε HTML
 * με τα προεπιλεγμένα Lexical components του Payload.
 *
 * Tailwind typography classes εφαρμόζονται σε όλα τα h1-h6, p, ul, ol, blockquote.
 */
export function ProductRichText({ data, className }: ProductRichTextProps) {
  if (!data) return null;

  return (
    <div
      className={cn(
        'prose-custom max-w-none text-brand-ink/80',
        '[&_h1]:mt-8 [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-brand-green',
        '[&_h2]:mt-7 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand-green',
        '[&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-brand-green',
        '[&_p]:mt-4 [&_p]:leading-relaxed',
        '[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul>li]:mt-2',
        '[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:mt-2',
        '[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-orange [&_blockquote]:pl-4 [&_blockquote]:italic',
        '[&_a]:text-brand-orange [&_a]:underline [&_a:hover]:text-brand-green',
        '[&_strong]:font-bold [&_strong]:text-brand-green',
        '[&_code]:rounded [&_code]:bg-brand-cream [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm',
        className,
      )}
    >
      <RichText data={data} />
    </div>
  );
}
