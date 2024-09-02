'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginFormData, useLoginSchema } from '@/features/auth/schemas/login';
import { FormField } from '@/components/form-field';
import { SubmitButton } from '@/components/submit-button';

export const LoginForm: React.FC = () => {
  const t = useTranslations('auth');
  const tForm = useTranslations('auth.form');
  const loginSchema = useLoginSchema();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // Here you would typically handle the login logic
    console.log(data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-card-foreground dark:text-white">
        {t('signInTitle')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="email"
          label={tForm('email.label')}
          type="email"
          placeholder={tForm('email.placeholder')}
          register={register}
          error={errors.email?.message}
        />
        <FormField
          name="password"
          label={tForm('password.label')}
          type="password"
          placeholder={tForm('password.placeholder')}
          register={register}
          error={errors.password?.message}
        />
        <SubmitButton isLoading={isSubmitting}>
          {t('action.login')}
        </SubmitButton>
        <div className="text-sm text-center">
          <a href="/forget-password" className="text-primary hover:underline">
            {t('action.forgotPassword')}
          </a>
        </div>
        <div className="text-sm text-center">
          {t('message.noAccount')}{' '}
          <a href="/register" className="text-primary hover:underline">
            {t('action.register')}
          </a>
        </div>
      </form>
    </>
  );
};
