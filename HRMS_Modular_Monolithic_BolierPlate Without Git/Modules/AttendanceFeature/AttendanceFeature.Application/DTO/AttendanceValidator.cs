using FluentValidation;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.Extensions;

namespace AttendanceFeature.Application.DTO
{
    public class CreateAttendanceValidator : AbstractValidator<CreateAttendanceRequest>
    {
        public CreateAttendanceValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new CreateAttendanceDtoValidator());
        }
    }

    public class ClockOutValidator : AbstractValidator<ClockOutRequest>
    {
        public ClockOutValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new ClockOutDtoValidator());
        }
    }

    public class DeleteAttendanceValidator : AbstractValidator<DeleteAttendanceRequest>
    {
        public DeleteAttendanceValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new AttendanceIdValidator<DeleteAttendanceDto>());
        }
    }

    internal class CreateAttendanceDtoValidator : AbstractValidator<CreateAttendanceDto>
    {
        public CreateAttendanceDtoValidator()
        {
            RuleFor(x => x.EmployeeId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreateAttendanceDto.EmployeeId)));
            
            RuleFor(x => x.Date)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreateAttendanceDto.Date)));
            
            RuleFor(x => x.ClockIn)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(CreateAttendanceDto.ClockIn)));
        }
    }

    internal class ClockOutDtoValidator : AbstractValidator<ClockOutDto>
    {
        public ClockOutDtoValidator()
        {
            RuleFor(x => x.AttendanceId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(ClockOutDto.AttendanceId)));
            
            RuleFor(x => x.ClockOut)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(ClockOutDto.ClockOut)));
        }
    }

    internal class AttendanceIdValidator<TDto> : AbstractValidator<TDto>
        where TDto : IAttendanceIdDto
    {
        public AttendanceIdValidator()
        {
            RuleFor(x => x.AttendanceId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(IAttendanceIdDto.AttendanceId)));
        }
    }
}
