type EmptyPageProps = {
  message: string
}

export function EmptyPage({ message }: EmptyPageProps) {
  return (
    <section>
      <span
        data-testid="empty-list"
        className="text-base text-gray-500 font-medium"
      >
        {message}
      </span>
    </section>
  )
}
