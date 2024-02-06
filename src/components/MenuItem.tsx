'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MenuItemProps = {
  path: string
  text: string
}

export function MenuItem({ path, text }: MenuItemProps) {
  const pathName = usePathname()

  return (
    <li>
      <Link
        className={`cursor-pointer sm:hover:bg-primary-foreground sm:px-4 sm:py-2 ${
          pathName === path
            ? 'border-b border-b-secondary-foreground transition-all'
            : ''
        }`}
        href={path}
      >
        {text}
      </Link>
    </li>
  )
}
