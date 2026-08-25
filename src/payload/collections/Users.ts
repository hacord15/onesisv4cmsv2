import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    hidden: true,
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles'],
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Only admins can change roles
        update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
      },
    },
  ],
}
