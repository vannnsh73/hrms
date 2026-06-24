using FluentValidation;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.Extensions;

namespace PayrollFeature.Application.DTO
{
    public class CreatePayrollRecordValidator : AbstractValidator<CreatePayrollRecordCommand>
    {
        public CreatePayrollRecordValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new CreatePayrollRecordDtoValidator());
        }
    }

    public class UpdatePayrollStatusValidator : AbstractValidator<UpdatePayrollStatusCommand>
    {
        public UpdatePayrollStatusValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new UpdatePayrollStatusDtoValidator());
        }
    }

    internal class CreatePayrollRecordDtoValidator : AbstractValidator<CreatePayrollRecordDto>
    {
        public CreatePayrollRecordDtoValidator()
        {
            RuleFor(x => x.EmployeeId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreatePayrollRecordDto.EmployeeId)));
            
            RuleFor(x => x.PayPeriod)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreatePayrollRecordDto.PayPeriod)));
        }
    }

    internal class UpdatePayrollStatusDtoValidator : AbstractValidator<UpdatePayrollStatusDto>
    {
        public UpdatePayrollStatusDtoValidator()
        {
            RuleFor(x => x.PayrollRecordId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UpdatePayrollStatusDto.PayrollRecordId)));
            
            RuleFor(x => x.Status)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UpdatePayrollStatusDto.Status)));
        }
    }
}
