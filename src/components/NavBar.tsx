import { Logo } from './Logo'
import { ButtonTheme } from './theme/ButtonTheme'
import { Menu } from './Menu'
import { MobileHeader } from './MobileHeader'

export function NavBar() {
  return (
    <section className="top-0 left-0 fixed w-full bg-background z-50">
      <header className="hidden sm:flex sm:items-center border-b border-b-secondary sm:justify-around">
        <Logo />
        <nav>
          <Menu />
        </nav>
        <ButtonTheme />
      </header>

      <MobileHeader>
        <Logo />
        <nav>
          <Menu />
        </nav>
        <ButtonTheme />
      </MobileHeader>
    </section>
  )
}
