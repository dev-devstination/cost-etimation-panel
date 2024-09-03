'use client';

import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginFormData, useLoginSchema } from '@/features/auth/schemas/login';
import { loginAction } from '@/features/auth/actions/login';
import { FormField } from '@/components/form-field';
import { SubmitButton } from '@/components/submit-button';
import { useTransition } from 'react';

const initialState = {
  errors: {},
  message: null,
};

export const LoginForm: React.FC = () => {
  const t = useTranslations('auth');
  const tForm = useTranslations('auth.form');
  const loginSchema = useLoginSchema();

  const [isPending, startTransition] = useTransition();
  const [serverState, formAction] = useFormState(loginAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      await formAction(formData);
    });
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
          error={errors.email?.message || serverState.errors?.email?.[0]}
        />
        <FormField
          name="password"
          label={tForm('password.label')}
          type="password"
          placeholder={tForm('password.placeholder')}
          register={register}
          error={errors.password?.message || serverState.errors?.password?.[0]}
        />
        <SubmitButton isLoading={isPending}>{t('action.login')}</SubmitButton>
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
