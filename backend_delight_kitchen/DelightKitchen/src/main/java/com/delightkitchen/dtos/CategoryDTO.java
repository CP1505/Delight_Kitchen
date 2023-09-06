package com.delightkitchen.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryDTO {
	private int categoryId;
	private String categoryName;
	private String categoryStatus = "Enabled";
	
	@Override
	public String toString() {
		return String.format("CategoryDTO [categoryId=%s, categoryName=%s, categoryStatus=%s]", categoryId,
				categoryName, categoryStatus);
	}

}
