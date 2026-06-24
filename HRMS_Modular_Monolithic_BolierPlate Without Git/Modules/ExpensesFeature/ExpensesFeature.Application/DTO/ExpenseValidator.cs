using FluentValidation;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.Extensions;

namespace ExpensesFeature.Application.DTO
{
    public class CreateExpenseClaimValidator : AbstractValidator<CreateExpenseClaimCommand>
    {
        public CreateExpenseClaimValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new CreateExpenseClaimDtoValidator());
        }
    }

    public class UpdateExpenseClaimStatusValidator : AbstractValidator<UpdateExpenseClaimStatusCommand>
    {
        public UpdateExpenseClaimStatusValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new UpdateExpenseClaimStatusDtoValidator());
        }
    }

    internal class CreateExpenseClaimDtoValidator : AbstractValidator<CreateExpenseClaimDto>
    {
        public CreateExpenseClaimDtoValidator()
        {
            RuleFor(x => x.EmployeeId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreateExpenseClaimDto.EmployeeId)));
            
            RuleFor(x => x.ClaimName)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreateExpenseClaimDto.ClaimName)));
        }
    }

    internal class UpdateExpenseClaimStatusDtoValidator : AbstractValidator<UpdateExpenseClaimStatusDto>
    {
        public UpdateExpenseClaimStatusDtoValidator()
        {
            RuleFor(x => x.ExpenseClaimId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UpdateExpenseClaimStatusDto.ExpenseClaimId)));
            
            RuleFor(x => x.Status)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UpdateExpenseClaimStatusDto.Status)));
        }
    }
}
