import { useState } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
}

export function AuthInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  register,
  error,
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getIcon = () => {
    if (type === 'email')
      return <Mail className="h-5 w-5 text-muted-foreground" />;
    if (type === 'password')
      return <Lock className="h-5 w-5 text-muted-foreground" />;
    return null;
  };

  return (
    <div className="space-y-1">
      {label && (
        <Label
          htmlFor={name}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </Label>
      )}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {getIcon()}
        </div>
        <Input
          id={name}
          type={type === 'password' && showPassword ? 'text' : type}
          className={cn(
            'px-10 transition-all duration-200 ease-in-out',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          {...register(name)}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
      {error && (
        <Alert variant="destructive" role="alert" className="mt-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
