import { AnnualTourIcon, CultureIcon, FestivalBonusIcon, LeaveCashoutIcon, MealsSnacksIcon, PerformanceRewardIcon, PrayerRoomIcon, SportsZoneIcon } from "@/svg/BenefitsIcons";

interface BenefitItem {
    id: number;
    icon: React.ElementType;
    title: string;
    hasBorderBottom?: boolean;
    hasBorderRight?: boolean;
}

export const benefitsData: BenefitItem[] = [
    {
        id: 1,
        icon: CultureIcon,
        title: "Excellent Culture & <br> Environment",
        hasBorderBottom: true
    },
    {
        id: 2,
        icon: SportsZoneIcon,
        title: "Relax and Sports <br> Zone",
        hasBorderBottom: true
    },
    {
        id: 3,
        icon: FestivalBonusIcon,
        title: "Dual Festival <br> Bonuses",
        hasBorderBottom: true
    },
    {
        id: 4,
        icon: AnnualTourIcon,
        title: "Annual Pleasure <br> Tour",
        hasBorderBottom: true
    },
    {
        id: 5,
        icon: MealsSnacksIcon,
        title: "Meals, Coffee & <br> Snacks",
        hasBorderRight: true
    },
    {
        id: 6,
        icon: PrayerRoomIcon,
        title: "Muslim Prayer <br> Zone",
        hasBorderRight: true
    },
    {
        id: 7,
        icon: LeaveCashoutIcon,
        title: "Leave <br> Encashment",
        hasBorderRight: true
    },
    {
        id: 8,
        icon: PerformanceRewardIcon,
        title: "Performance <br> Bonus"
    }
];
