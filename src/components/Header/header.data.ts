import { pages } from '@/config/pages-url.config'

interface INavbarLink {
  name: string,
  link: string
}
export const navbarLink: INavbarLink[] = [
  {
    name: 'About',
    link: pages.about
  },
  {
    name: 'Projects',
    link: pages.projects
  },
  {
    name: 'Blog',
    link: pages.blog
  },
]
