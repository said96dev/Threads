export type LinkType = {
  imgURL: string;
  route: string;
  label: string;
};

export type TabType = {
  value: string;
  label: string;
  icon: string;
};

export const sidebarLinks: LinkType[] = [
  {
    imgURL: '/assets/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/search.svg',
    route: '/search',
    label: 'Search',
  },
  {
    imgURL: '/assets/heart.svg',
    route: '/activity',
    label: 'Activity',
  },
  {
    imgURL: '/assets/create.svg',
    route: '/create-thread',
    label: 'Create Thread',
  },
  {
    imgURL: '/assets/community.svg',
    route: '/communities',
    label: 'Communities',
  },
  {
    imgURL: '/assets/user.svg',
    route: '/profile',
    label: 'Profile',
  },
];

export const profileTabs: TabType[] = [
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'replies', label: 'Replies', icon: '/assets/members.svg' },
  { value: 'tagged', label: 'Tagged', icon: '/assets/tag.svg' },
];

export const communityTabs: TabType[] = [
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'members', label: 'Members', icon: '/assets/members.svg' },
  { value: 'requests', label: 'Requests', icon: '/assets/request.svg' },
];
