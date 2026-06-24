using FluentValidation;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.Extensions;

namespace LeaveManagementFeature.Application.DTO
{
    public class CreateLeaveRequestValidator : AbstractValidator<CreateLeaveRequestCommand>
    {
        public CreateLeaveRequestValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new CreateLeaveRequestDtoValidator());
        }
    }

    public class UpdateLeaveRequestStatusValidator : AbstractValidator<UpdateLeaveRequestStatusCommand>
    {
        public UpdateLeaveRequestStatusValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new UpdateLeaveRequestStatusDtoValidator());
        }
    }

    internal class CreateLeaveRequestDtoValidator : AbstractValidator<CreateLeaveRequestDto>
    {
        public CreateLeaveRequestDtoValidator()
        {
            RuleFor(x => x.EmployeeId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreateLeaveRequestDto.EmployeeId)));
            
            RuleFor(x => x.LeaveType)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreateLeaveRequestDto.LeaveType)));

            RuleFor(x => x.StartDate)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreateLeaveRequestDto.StartDate)));

            RuleFor(x => x.EndDate)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreateLeaveRequestDto.EndDate)))
                .GreaterThanOrEqualTo(x => x.StartDate)
                .WithMessage("EndDate must be greater than or equal to StartDate.");
                
            RuleFor(x => x.TotalDays)
                .GreaterThan(0)
                .WithMessage("TotalDays must be greater than 0.");
        }
    }

    internal class UpdateLeaveRequestStatusDtoValidator : AbstractValidator<UpdateLeaveRequestStatusDto>
    {
        public UpdateLeaveRequestStatusDtoValidator()
        {
            RuleFor(x => x.LeaveRequestId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UpdateLeaveRequestStatusDto.LeaveRequestId)));
            
            RuleFor(x => x.Status)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UpdateLeaveRequestStatusDto.Status)));
        }
    }
}
