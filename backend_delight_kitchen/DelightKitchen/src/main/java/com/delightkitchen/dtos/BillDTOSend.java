package com.delightkitchen.dtos;

import java.sql.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BillDTOSend {

	private int billId;
	private int billOrderId;
	private String billCashierName;
	private String waiterName;
	private float taxAndCharge;
	private float discount;
	private float billAmount;
	private float billTotal;
	private Date billDate;
	private String billPaymentMethod;
	private String billStatus;
	private String tableName;
	private int tableId;

	public BillDTOSend(int billOrderId, String billCashierName, String waiterName, float taxAndCharge, float discount,
			float billAmount, Date billDate, String billPaymentMethod, String billStatus, String tableName) {
		super();
		this.billOrderId = billOrderId;
		this.billCashierName = billCashierName;
		this.waiterName = waiterName;
		this.taxAndCharge = taxAndCharge;
		this.discount = discount;
		this.billAmount = billAmount;
		this.billDate = billDate;
		this.billPaymentMethod = billPaymentMethod;
		this.billStatus = billStatus;
		this.tableName = tableName;
	}

	@Override
	public String toString() {
		return String.format(
				"BillDTOSend [billId=%s,billOrderId=%s, billCashierName=%s, waiterName=%s, taxAndCharge=%s, discount=%s, billAmount=%s, billDate=%s, billPaymentMethod=%s, billStatus=%s, tableName=%s]",
				billId, billOrderId, billCashierName, waiterName, taxAndCharge, discount, billAmount, billDate,
				billPaymentMethod, billStatus, tableName);
	}

}
